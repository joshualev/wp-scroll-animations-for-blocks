/**
 * Animation Handler
 * =================
 * 
 * Handles setup and initialization of entrance and scroll animations.
 * Uses MotionContext properties directly for clean, type-safe animation creation.
 */

import { MotionContext} from "@/core/types";
import { createEntranceAnimation } from "@/core/animations/entrance";
import { createScrollAnimation } from "@/core/animations/scroll";
import { supportsViewTimeline, getEntranceAnimationType, getScrollAnimationType } from "@/core/utils/animation";
/**
 * Sets up an entrance animation using MotionContext timing properties.
 * Creates a time-based animation that plays once when triggered.
 * 
 * Uses MotionContext properties: entranceAnimationType, motionDuration, motionDelay, motionTimingFunction
 * 
 * @param motionElement - The element to animate
 * @param motionContext - Motion configuration from block attributes
 */
export function setupEntranceAnimation(motionElement: HTMLElement, motionContext: MotionContext): void {
    const animationType = getEntranceAnimationType(motionContext.entranceAnimationType);
    if (!animationType) {
        console.warn("Motion Blocks: No valid entrance animation type found");
        return;
    }
    
    // Create animation directly from MotionContext properties
    const animation = createEntranceAnimation(motionElement, motionContext, animationType);
    
    if (!animation) {
        console.warn("Motion Blocks: Failed to create entrance animation");
        return;
    }
    
    animation.play();
}

/**
 * Sets up a scroll-driven animation using MotionContext scroll properties.
 * Creates a scroll-timeline based animation using the ViewTimeline API.
 * 
 * Uses MotionContext properties: scrollAnimationType, scrollCompletionPoint
 * 
 * @param motionElement - The element to animate
 * @param motionContext - Motion configuration from block attributes
 */
export function setupScrollAnimation(motionElement: HTMLElement, motionContext: MotionContext): void {
    // Check browser support
    if (!supportsViewTimeline()) {
        console.warn('Motion Blocks: Browser does not support scroll-driven animations.');
        return;
    }

    const animationType = getScrollAnimationType(motionContext.scrollAnimationType);
    if (!animationType) {
        console.warn(`Motion Blocks: Invalid scroll animation type: ${motionContext.scrollAnimationType}`);
        return;
    }

    // Create animation directly from MotionContext properties
    const animation = createScrollAnimation(motionElement, motionContext, animationType);

    if (!animation) {
        console.warn('Motion Blocks: Failed to create scroll animation.');
        motionElement.style.opacity = '1';
        return;
    }

}
