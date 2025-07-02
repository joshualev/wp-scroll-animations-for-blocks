/**
 * Motion Trigger
 * ==============
 * 
 * Manages visibility observation and animation triggering for Motion Blocks.
 * Observes elements entering the viewport and triggers appropriate entrance or scroll animations.
 */

import { MotionContext } from "@/core/types";
import { createEntranceAnimation, isValidEntranceAnimation } from "@/core/animations/entrance";
import { createScrollAnimation, isValidScrollAnimation } from "@/core/animations/scroll";

/**
 * Viewport buffer distance for pre-triggering animations.
 * Ensures animations start smoothly before elements fully enter the viewport.
 */
const VIEWPORT_TRIGGER_BUFFER = '50px';

/**
 * Observes target element visibility and triggers configured motion animations.
 * 
 * Sets up an IntersectionObserver that monitors when elements come into view.
 * When the visibility threshold is met, triggers either entrance animations 
 * (fade, bounce, slide) or scroll animations (parallax, scale, rotate).
 * 
 * **Behavior:**
 * - Triggers once when element becomes visible
 * - Automatically disconnects observer after animation starts
 * - Uses configurable visibility threshold (0-100%)
 * - Includes 50px buffer for smooth pre-triggering
 * 
 * @param elementToObserve - DOM element that will be animated when visible
 * @param animationConfig - Block configuration containing animation type, threshold, and settings
 */
export function observeElementAndTriggerMotion(
    elementToObserve: HTMLElement,
    animationConfig: MotionContext,
): void {
    // Convert percentage threshold to decimal format required by IntersectionObserver
    const thresholdDecimal = (animationConfig.motionThreshold ?? 0) / 100;
    
    console.log('👁️ Setting up IntersectionObserver:', {
        element: elementToObserve,
        threshold: `${animationConfig.motionThreshold}% (${thresholdDecimal})`,
        entranceType: animationConfig.entranceAnimationType,
        scrollEnabled: animationConfig.scrollAnimationEnabled
    });
    
    const visibilityObserver = new IntersectionObserver(
        (observerEntries) => {
            console.log('👁️ IntersectionObserver triggered:', observerEntries);
            
            // Find first visible entry
            const firstVisibleEntry = observerEntries.find(entry => entry.isIntersecting);
            
            if (!firstVisibleEntry) {
                console.log('👁️ No intersecting entries found');
                return;
            }

            console.log('✨ Element is visible! Triggering animation:', {
                intersectionRatio: firstVisibleEntry.intersectionRatio,
                threshold: thresholdDecimal,
                element: elementToObserve
            });

            // Setup and trigger animation based on configuration
            setupMotionAnimation(elementToObserve, animationConfig);
            visibilityObserver.disconnect(); // Prevents repeated triggers
            console.log('👁️ Observer disconnected after animation trigger');
        },
        {
            threshold: thresholdDecimal, // Percentage of element that must be visible
            rootMargin: VIEWPORT_TRIGGER_BUFFER, // 50px buffer for early triggering
        }
    );

    // Begin monitoring element visibility
    visibilityObserver.observe(elementToObserve);
    console.log('👁️ Observer started for element:', elementToObserve);
}

/**
 * Sets up and initializes the appropriate motion animation based on block configuration.
 * 
 * Determines whether to trigger entrance animations (time-based) or scroll animations 
 * (viewport-driven) based on the scrollAnimationEnabled setting.
 * 
 * **Animation Types:**
 * - Entrance: CSS keyframe animations that play once
 * - Scroll: ViewTimeline API animations that respond to scroll position
 * 
 * @param motionElement - DOM element to apply animation effects to
 * @param motionConfig - Motion configuration determining animation type and parameters
 */
function setupMotionAnimation(motionElement: HTMLElement, motionConfig: MotionContext): void {
    const shouldUseScrollAnimation = motionConfig.scrollAnimationEnabled;
    
    if (shouldUseScrollAnimation) {
        setupScrollAnimation(motionElement, motionConfig);
    } else {
        setupEntranceAnimation(motionElement, motionConfig);
    }
}

/**
 * Sets up an entrance animation using MotionContext timing properties.
 * Creates a time-based animation that plays once when triggered.
 * 
 * @param motionElement - The element to animate
 * @param motionContext - Motion configuration from block attributes
 */
function setupEntranceAnimation(motionElement: HTMLElement, motionContext: MotionContext): void {
    if (!motionContext.entranceAnimationType || !isValidEntranceAnimation(motionContext.entranceAnimationType)) {
        console.warn("Motion Blocks: No valid entrance animation type found");
        return;
    }
    
    const animationType = motionContext.entranceAnimationType; // Safe after validation
    
    // Create animation directly from MotionContext properties
    createEntranceAnimation(motionElement, motionContext, animationType);
}

/**
 * Sets up a scroll-driven animation using MotionContext scroll properties.
 * Creates a scroll-timeline based animation using the ViewTimeline API.
 * 
 * @param motionElement - The element to animate
 * @param motionContext - Motion configuration from block attributes
 */
function setupScrollAnimation(motionElement: HTMLElement, motionContext: MotionContext): void {
    // Check browser support for ViewTimeline API
    if (!supportsViewTimeline()) {
        console.warn('Motion Blocks: Browser does not support scroll-driven animations.');
        return;
    }

    if (!motionContext.scrollAnimationType || !isValidScrollAnimation(motionContext.scrollAnimationType)) {
        console.warn(`Motion Blocks: Invalid scroll animation type: ${motionContext.scrollAnimationType}`);
        return;
    }
    
    const animationType = motionContext.scrollAnimationType; // Safe after validation

    // Create animation directly from MotionContext properties
    createScrollAnimation(motionElement, motionContext, animationType);
}

/**
 * Checks if the browser supports ViewTimeline API for scroll-driven animations.
 * 
 * @returns True if browser supports scroll-driven animations
 */
function supportsViewTimeline(): boolean {
    return typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()');
} 