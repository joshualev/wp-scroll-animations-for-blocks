/**
 * Motion Blocks Frontend Runtime
 * ==============================
 * 
 * WordPress Interactivity API integration for motion animations.
 * Orchestrates entrance and scroll-driven animations using modern web APIs.
 */

import { store, getElement, getContext } from "@wordpress/interactivity";
import { 
    AnimationState, 
    toAnimationPreset,
    type MotionContext, 
    type MotionElement, 
    type MotionOptions, 
} from "./types";
import { createEntranceAnimation, createScrollAnimation, supportsViewTimeline } from "./animations";
import { prefersReducedMotion } from "./utils/accessibility";

/**
 * WordPress Interactivity API store for Motion Blocks.
 * Provides callbacks and reactive state for animation orchestration.
 */
store("motion-blocks", {
    callbacks: {
        /**
         * Initializes motion animations for a block element.
         * Called when element mounts via `data-wp-init="callbacks.initMotion"`.
         */
        initMotion() {
            const context = getContext<MotionContext>();
            // Use getElement() to get the current element in WordPress Interactivity API
            const element = getElement().ref as MotionElement;

            console.log("Motion Blocks: Initializing element", element);
            console.log("Motion Blocks: Context:", {
                motionEnabled: context?.motionEnabled,
                motionPreset: context?.motionPreset,
                motionScrollEnabled: context?.motionScrollEnabled,
                motionScrollRange: context?.motionScrollRange,
                motionDuration: context?.motionDuration
            });

            if (!element || !context?.motionEnabled) {
                console.log("Motion Blocks: Skipping - element missing or motion disabled");
                if (!element) console.log("  - No element found");
                if (!context?.motionEnabled) console.log("  - Motion not enabled in context");
                return;
            }

            // Skip if user prefers reduced motion
            if (prefersReducedMotion()) {
                console.log("Motion Blocks: Animations disabled due to reduced motion preference");
                return;
            }

            // Validate animation preset
            if (!context.motionPreset || context.motionPreset === "none") {
                return;
            }

            try {
                initializeElementMotion(element, context);
            } catch (error) {
                console.error("Motion Blocks: Failed to initialize animation:", error);
                // Fallback: make element visible if animation fails
                element.style.opacity = "1";
            }
        }
    }
});

/**
 * Initializes motion animations for an element based on its configuration.
 * 
 * @param element - Target element to animate
 * @param context - Motion configuration from block attributes
 */
function initializeElementMotion(element: MotionElement, context: MotionContext): void {
    console.log("Motion Blocks: Initializing element motion with context:", context);

    // Initialize element state
    element._motionState = AnimationState.IDLE;
    element._animations = {};
    element._observers = [];

    // Create motion options from context
    const motionOptions: MotionOptions = {
        duration: context.motionDuration || 600,
        delay: context.motionDelay || 0,
        easing: context.motionTimingFunction || "ease-out",
        fill: "forwards",
        threshold: Math.max(0.1, Math.min(1, (context.motionScrollRange || 30) / 100)) // Clamp between 0.1-1
    };

    console.log("Motion Blocks: Motion options:", motionOptions);

    // Start observing for element visibility
    observeElementForAnimation(element, context, motionOptions);
}

/**
 * Sets up intersection observer to trigger animations when element becomes visible.
 * 
 * @param element - Target element to observe
 * @param context - Motion configuration
 * @param options - Resolved animation options
 */
function observeElementForAnimation(
    element: MotionElement, 
    context: MotionContext, 
    options: MotionOptions
): void {
    console.log(`Motion Blocks: Setting up visibility observer with threshold ${options.threshold}`);

    // Create intersection observer to watch for element visibility
    const observer = new IntersectionObserver((entries) => {
        // this is the entry that is being observed
        const entry = entries[0];
        
        // if the element is intersecting, then the element is visible
        if (entry.isIntersecting) {
            console.log("Motion Blocks: Element became visible");
            
            // if the element is not idle, then the element is already animating
            if (element._motionState !== AnimationState.IDLE) {
                console.log(`Motion Blocks: Skipping animation - element state is ${element._motionState}`);
                return;
            }

            // this is the entrance animation that is being started
            console.log("Motion Blocks: Starting entrance animation");
            startEntranceAnimation(element, context, options);
            
            // Disconnect observer since we only want to trigger once
            observer.disconnect();
        }
    }, {
        threshold: options.threshold,
        rootMargin: "50px"
    });

    observer.observe(element);
    
    // Store observer reference for cleanup
    if (!element._observers) {
        element._observers = [];
    }
    element._observers.push(observer);
}

/**
 * Starts the entrance animation for an element.
 * 
 * @param element - Target element to animate
 * @param context - Motion configuration
 * @param options - Animation timing options
 */
function startEntranceAnimation(
    element: MotionElement,
    context: MotionContext,
    options: MotionOptions
): void {
    console.log(`Motion Blocks: Starting entrance animation with preset: ${context.motionPreset}`);
    element._motionState = AnimationState.ENTRY_PLAYING;

    // Convert string preset to enum safely
    const preset = toAnimationPreset(context.motionPreset);
    if (!preset) {
        console.warn(`Motion Blocks: Invalid animation preset: ${context.motionPreset}`);
        element.style.opacity = "1"; // Fallback visibility
        return;
    }

    const animation = createEntranceAnimation(element, preset, options);

    if (!animation) {
        console.warn("Motion Blocks: Failed to create entrance animation");
        // Fallback: make element visible
        element.style.opacity = "1";
        element._motionState = AnimationState.ENTRY_COMPLETE;
        return;
    }

    // Store animation reference
    element._animations!.entrance = animation;

    // Handle animation completion
    animation.addEventListener("finish", () => {
        console.log("Motion Blocks: Entrance animation completed successfully");
        element._motionState = AnimationState.ENTRY_COMPLETE;

        // Start watching for element to leave viewport if scroll animation enabled
        if (context.motionScrollEnabled) {
            console.log("Motion Blocks: Scroll animation enabled - watching for element to leave viewport");
            observeForElementToLeaveAndReturn(element, context);
        } else {
            console.log("Motion Blocks: Scroll animation disabled, staying in static state");
        }
    });

    animation.addEventListener("cancel", () => {
        console.warn("Motion Blocks: Entrance animation was cancelled");
        element.style.opacity = "1"; // Ensure visibility
        element._motionState = AnimationState.ENTRY_COMPLETE;
    });

    console.log("Motion Blocks: Entrance animation started successfully");
}

/**
 * Sets up scroll-driven animation after entrance animation completes.
 * With ViewTimeline API, the animation is progressive and tied to scroll position.
 * 
 * @param element - Target element to animate
 * @param context - Motion configuration
 */
/**
 * Watches for element to leave viewport, then return, then sets up scroll animation.
 * This ensures scroll animation only activates after entrance is complete and element
 * has been out of view and comes back.
 */
function observeForElementToLeaveAndReturn(element: MotionElement, context: MotionContext): void {
    console.log("Motion Blocks: Setting up observer to watch element leaving viewport");

    let hasLeftViewport = false;

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        
        if (!entry.isIntersecting && !hasLeftViewport) {
            // Element just left viewport for the first time
            hasLeftViewport = true;
            console.log("Motion Blocks: Element left viewport - now watching for return");
        } else if (entry.isIntersecting && hasLeftViewport) {
            // Element has returned to viewport after leaving
            console.log("Motion Blocks: Element returned to viewport - setting up scroll animation");
            observer.disconnect(); // Stop watching
            setupScrollAnimation(element, context);
        }
    }, {
        threshold: 0,
        rootMargin: "50px"
    });

    observer.observe(element);
    
    // Store observer reference for cleanup
    if (!element._observers) {
        element._observers = [];
    }
    element._observers.push(observer);
}

/**
 * Sets up scroll-driven animation using Web Animations API.
 * Only called after element has completed entrance animation and re-entered viewport.
 */
function setupScrollAnimation(element: MotionElement, context: MotionContext): void {
    console.log("Motion Blocks: Setting up scroll animation");

    // Check browser support early
    if (!supportsViewTimeline()) {
        console.warn("Motion Blocks: Browser does not support scroll-driven animations. Entrance animation will remain static.");
        element._motionState = AnimationState.SCROLL_READY;
        return;
    }

    // Convert string preset to enum safely
    const preset = toAnimationPreset(context.motionPreset);
    if (!preset) {
        console.warn(`Motion Blocks: Invalid animation preset for scroll: ${context.motionPreset}`);
        return;
    }

    // Create scroll animation - this should return Animation instance now
    const animation = createScrollAnimation(
        element,
        preset,
        context.motionScrollRange || 30
    );

    if (animation) {
        element._motionState = AnimationState.SCROLL_ACTIVE;
        // Store the scroll animation reference
        element._animations!.scroll = animation;
        console.log("Motion Blocks: Scroll animation activated - will progress automatically with scroll position");
    } else {
        console.warn("Motion Blocks: Failed to create scroll animation, falling back to static state");
        element._motionState = AnimationState.SCROLL_READY;
    }
}

 