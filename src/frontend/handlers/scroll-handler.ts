/**
 * Scroll Animation Handler
 * 
 * Handles setup and management of scroll-driven animations.
 * Manages browser support detection and animation creation.
 */

import { MotionContext, MotionElement, MotionState } from "@/shared/types";
import { createScrollAnimation } from "@/frontend/animations/create-scroll-animation";
import { getAnimationType } from "@/frontend/utils/get-animation-type";

/**
 * Sets up scroll-driven animation using Web Animations API.
 * Only called after element has completed entrance animation and re-entered viewport.
 * 
 * @param motionElement - Target element for scroll animation
 * @param motionContext - Motion configuration
 */
export function setupScrollAnimation(motionElement: MotionElement, motionContext: MotionContext): void {
    /**
     * Detects ViewTimeline API support for scroll-driven animations.
     * @returns `true` if browser supports CSS scroll-driven animations
     */
    function supportsViewTimeline(): boolean {
        // Check for CSS.supports if available
        if (typeof CSS !== 'undefined' && CSS.supports) {
            const supports = CSS.supports('animation-timeline', 'view()');
            console.log(`Motion Blocks: CSS.supports('animation-timeline', 'view()') = ${supports}`);
            return supports;
        }
        return false;
    };
    

    // Check browser support early
    if (!supportsViewTimeline()) {
        console.warn("Motion Blocks: Browser does not support scroll-driven animations. Entrance animation will remain static.");
        motionElement._motionState = MotionState.SCROLL_READY;
        return;
    }

    // Convert string type to enum safely
    const animationType = getAnimationType(motionContext.motionType);
    if (!animationType) {
        console.warn(`Motion Blocks: Invalid animation type for scroll: ${motionContext.motionType}`);
        return;
    }

    // Create scroll animation
    const animation = createScrollAnimation({
        motionElement: motionElement,
        animationType: animationType,
        scrollRange: motionContext.motionScrollRange || 30
    });

    if (animation) {
        motionElement._motionState = MotionState.SCROLL_ACTIVE;
        motionElement._animations!.scroll = animation;
        console.log("Motion Blocks: Scroll animation activated - will progress with scroll position");
    } else {
        console.warn("Motion Blocks: Failed to create scroll animation, falling back to static state");
        motionElement._motionState = MotionState.SCROLL_READY;
    }
} 