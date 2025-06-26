/**
 * Visibility Observer
 * 
 * Handles intersection observation for initial element visibility detection.
 * Triggers entrance animations when elements become visible.
 */

import { MotionContext, MotionElement, MotionOptions, MotionState } from "@/shared/types";
import { startEntranceAnimation } from "@/frontend/handlers/entrance-handler";

/**
 * Sets up intersection observer to trigger animations when element becomes visible.
 * 
 * @param motionElement - Target element to observe
 * @param motionContext - Motion configuration
 * @param motionOptions - Resolved animation options
 */
export function observeElementVisibility(
    motionElement: MotionElement,
    motionContext: MotionContext,
    motionOptions: MotionOptions
): void {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting) {
            console.log("Motion Blocks: Element became visible");
            
            // Skip if element is already animating
            if (motionElement._motionState !== MotionState.IDLE) {
                console.log(`Motion Blocks: Skipping animation - element state is ${motionElement._motionState}`);
                return;
            }

            console.log("Motion Blocks: Starting entrance animation");
            startEntranceAnimation(motionElement, motionContext, motionOptions);
            
            // Disconnect observer since entrance only happens once
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