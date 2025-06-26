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
    toAnimationType,
    type MotionContext, 
    type MotionElement, 
    type MotionOptions, 
} from "./types";
import { createEntranceAnimation, createScrollAnimation } from "./animations";
import { prefersReducedMotion, supportsViewTimeline } from "./utils";
import "./frontend-view.scss";

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
            const motionContext = getContext<MotionContext>();
            // Use getElement() to get the current element in WordPress Interactivity API
            const motionElement = getElement().ref as MotionElement;

            console.log("Motion Blocks: Context:", {
                motionEnabled: motionContext?.motionEnabled,
                motionType: motionContext?.motionType,
                motionScrollEnabled: motionContext?.motionScrollEnabled,
                motionScrollRange: motionContext?.motionScrollRange,
                motionDuration: motionContext?.motionDuration
            });

            if (!motionElement || !motionContext?.motionEnabled) {
                console.warn("Motion Blocks: Skipping - element missing or motion disabled");
                return;
            }

            // Skip if user prefers reduced motion
            if (prefersReducedMotion()) {
                console.warn("Motion Blocks: Animations disabled due to reduced motion preference");
                return;
            }

            // Validate animation type
            if (!motionContext.motionType || motionContext.motionType === "none") {
                return;
            }

            try {
                initializeElementMotion(motionElement, motionContext);
            } catch (error) {
                console.error("Motion Blocks: Failed to initialize animation:", error);
                // Fallback: make element visible if animation fails
                motionElement.style.opacity = "1";
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
function initializeElementMotion(motionElement: MotionElement, motionContext: MotionContext): void {
    console.log("Motion Blocks: Initializing element motion with context:", motionContext);

    // Initialize element state
    motionElement._motionState = AnimationState.IDLE;
    motionElement._animations = {};
    motionElement._observers = [];

    // Create motionOptions from motionContext
    const motionOptions: MotionOptions = {
        duration: motionContext.motionDuration || 600,
        delay: motionContext.motionDelay || 0,
        easing: motionContext.motionTimingFunction || "ease-out",
        fill: "forwards",
        threshold: Math.max(0.1, Math.min(1, (motionContext.motionScrollRange || 30) / 100)) // Clamp between 0.1-1
    };

    console.log("Motion Blocks: MotionOptions:", motionOptions);

    // Start observing for element visibility
    observeElementForAnimation(motionElement, motionContext, motionOptions);
}

/**
 * Sets up intersection observer to trigger animations when element becomes visible.
 * 
 * @param element - Target element to observe
 * @param context - Motion configuration
 * @param options - Resolved animation options
 */
function observeElementForAnimation(
    motionElement: MotionElement, 
    motionContext: MotionContext, 
    motionOptions: MotionOptions
): void {
    console.log(`Motion Blocks: Setting up visibility observer with threshold ${motionOptions.threshold}`);

    // Create intersection observer to watch for element visibility
    const observer = new IntersectionObserver((entries) => {
        // this is the entry that is being observed
        const entry = entries[0];
        
        // if the element is intersecting, then the element is visible
        if (entry.isIntersecting) {
            console.log("Motion Blocks: Element became visible");
            
            // if the element is not idle, then the element is already animating
            if (motionElement._motionState !== AnimationState.IDLE) {
                console.log(`Motion Blocks: Skipping animation - element state is ${motionElement._motionState}`);
                return;
            }

            // this is the entrance animation that is being started
            console.log("Motion Blocks: Starting entrance animation");
            startEntranceAnimation(motionElement, motionContext, motionOptions);
            
            // Disconnect observer since we only want to trigger once
            observer.disconnect();
        }
    }, {
        threshold: motionOptions.threshold,
        rootMargin: "50px"
    });

    observer.observe(motionElement);
    
    // Store observer reference for cleanup
    if (!motionElement._observers) {
        motionElement._observers = [];
    }
    motionElement._observers.push(observer);
}

/**
 * Starts the entrance animation for an element.
 * 
 * @param element - Target element to animate
 * @param context - Motion configuration
 * @param motionOptions - Animation timing options
 */
function startEntranceAnimation(
    motionElement: MotionElement,
    motionContext: MotionContext,
    motionOptions: MotionOptions
): void {
    console.log(`Motion Blocks: Starting entrance animation with type: ${motionContext.motionType}`);
    motionElement._motionState = AnimationState.ENTRY_PLAYING;

    // Convert string type to enum safely
    const type = toAnimationType(motionContext.motionType);
    if (!type) {
        console.warn(`Motion Blocks: Invalid animation type: ${motionContext.motionType}`);
        motionElement.style.opacity = "1"; // Fallback visibility
        return;
    }

    const animation = createEntranceAnimation(motionElement, type, motionOptions);

    if (!animation) {
        console.warn("Motion Blocks: Failed to create entrance animation");
        // Fallback: make element visible
        motionElement.style.opacity = "1";
        motionElement._motionState = AnimationState.ENTRY_COMPLETE;
        return;
    }

    // Store animation reference
    motionElement._animations!.entrance = animation;

    // Handle animation completion
    animation.addEventListener("finish", () => {
        console.info("Motion Blocks: Entrance animation completed successfully");
        motionElement._motionState = AnimationState.ENTRY_COMPLETE;

        // Start watching for element to leave viewport if scroll animation enabled
        if (motionContext.motionScrollEnabled) {
            observeForElementToLeaveAndReturn(motionElement, motionContext);
        } else {
            console.info("Motion Blocks: Scroll animation disabled, staying in static state");
        }
    });

    animation.addEventListener("cancel", () => {
        console.warn("Motion Blocks: Entrance animation was cancelled");
        motionElement.style.opacity = "1"; // Ensure visibility
        motionElement._motionState = AnimationState.ENTRY_COMPLETE;
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
function observeForElementToLeaveAndReturn(motionElement: MotionElement, motionContext: MotionContext): void {
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
            setupScrollAnimation(motionElement, motionContext);
        }
    }, {
        threshold: 0,
        rootMargin: "50px"
    });

    observer.observe(motionElement);
    
    // Store observer reference for cleanup
    if (!motionElement._observers) {
        motionElement._observers = [];
    }
    motionElement._observers.push(observer);
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

    // Convert string type to enum safely
    const type = toAnimationType(context.motionType);
    if (!type) {
        console.warn(`Motion Blocks: Invalid animation type for scroll: ${context.motionType}`);
        return;
    }

    // Create scroll animation - this should return Animation instance now
    const animation = createScrollAnimation(
        element,
        type,
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

