/**
 * Visibility Observer
 * ===================
 * 
 * Handles element visibility detection to trigger animations.
 * Monitors when elements become visible and triggers appropriate animation setup.
 */

import { MotionContext } from "@/core/types";
import { setupEntranceAnimation, setupScrollAnimation } from '@/core/handlers/animation-handler';

/**
 * Sets up intersection observer to watch for element visibility.
 * 
 * **Animation Trigger Criteria:**
 * - Element must be visible in the viewport (intersecting with the threshold)
 * - Once both conditions are met, the appropriate animation is triggered immediately
 * - Observer is automatically cleaned up after triggering to prevent repeated animations
 * 
 * @param motionElement - Target element to observe
 * @param motionContext - Motion configuration from block attributes
 * @param threshold - Visibility threshold (0-1) for triggering animation
 */
export function observeElementVisibility(
    motionElement: HTMLElement,
    motionContext: MotionContext,
): void {
    const intersectionThreshold = motionContext.motionThreshold / 100;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const isElementVisible = entry.isIntersecting;
                
                // Early exit if conditions not met
                if (!isElementVisible) {
                    return;
                }
                
                // Trigger the appropriate animation type
                triggerAppropriateAnimation(motionElement, motionContext);
                
                // Clean up observer after triggering animation
                observer.disconnect();
            });
        },
        {
            threshold: intersectionThreshold,
        }
    );

    observer.observe(motionElement);
}

/**
 * Determines and triggers the appropriate animation type based on configuration.
 * 
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration determining animation type
 */
function triggerAppropriateAnimation(motionElement: HTMLElement, motionContext: MotionContext): void {
    const animationSetup = motionContext.scrollAnimationEnabled 
        ? setupScrollAnimation 
        : setupEntranceAnimation;
    
    animationSetup(motionElement, motionContext);
}
