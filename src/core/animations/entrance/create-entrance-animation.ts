/**
 * Animation Factory
 * =================
 * 
 * Creates animations directly from MotionContext properties.
 * All configuration comes from MotionContext - no abstract configuration objects.
 * This makes it crystal clear that animations are configured from block attributes.
 */

import { MotionContext } from "@/core/types";
import { 
    type EntranceAnimationType, 
    getEntranceKeyframes
} from "@/core/animations/entrance";


/**
 * Creates an entrance animation using MotionContext timing properties.
 * Uses: motionDuration, motionDelay, motionTimingFunction from MotionContext.
 * 
 * @param motionElement - Element to animate
 * @param motionContext - Block configuration with timing properties
 * @param animationType - Specific entrance animation type
 * @returns Animation instance or null if creation fails
 */
export function createEntranceAnimation(
    motionElement: HTMLElement,
    motionContext: MotionContext,
    animationType: EntranceAnimationType
): void {
    try {
        const keyframes = getEntranceKeyframes(animationType);
        
        if (!keyframes) {
            console.error(`Unknown entrance animation type: ${animationType}`);
            return;
        }
        
        // Use MotionContext timing properties directly
        motionElement.animate(keyframes, {
            duration: motionContext.motionDuration,
            delay: motionContext.motionDelay,
            easing: motionContext.motionTimingFunction,
            fill: "forwards"
        }); // Fire and forget
        
    } catch (error) {
        console.error("Failed to create entrance animation:", error);
    }
}

