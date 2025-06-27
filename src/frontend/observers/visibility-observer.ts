/**
 * Visibility Observer
 * 
 * Handles element visibility detection to trigger animations.
 * Monitors when elements become visible and triggers appropriate animation type.
 */

import { MotionContext, MotionElement, EntranceAnimationOptions, MotionState } from "@/shared/types";
import { startEntranceAnimation } from "../handlers/entrance-handler";
import { setupScrollAnimation } from "../handlers/scroll-handler";

/**
 * Sets up intersection observer to watch for element visibility.
 * Triggers appropriate animation (entrance or scroll) when element becomes visible.
 * 
 * @param motionElement - Target element to observe
 * @param motionContext - Motion configuration from block attributes  
 * @param entranceOptions - Entrance animation timing and threshold options (null for scroll animations)
 */
export function observeElementVisibility(
    motionElement: MotionElement,
    motionContext: MotionContext,
    entranceOptions: EntranceAnimationOptions | null
): void {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && motionElement._motionState === MotionState.IDLE) {
                    
                    if (motionContext.scrollAnimationEnabled) {
                        setupScrollAnimation(motionElement, motionContext);
                    } else {
                        if (entranceOptions) {
                            startEntranceAnimation(motionElement, motionContext, entranceOptions);
                        } else {
                            console.error("Motion Blocks: No entrance options provided for entrance animation");
                        }
                    }
                    
                    // Clean up observer after triggering animation
                    observer.disconnect();
                }
            });
        },
        {
            threshold: (motionContext.motionThreshold || 30) / 100,
            rootMargin: "0px"
        }
    );

    observer.observe(motionElement);
    
    // Store observer reference for cleanup
    if (!motionElement._observers) {
        motionElement._observers = [];
    }
    motionElement._observers.push(observer);
} 