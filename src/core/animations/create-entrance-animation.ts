/**
 * Animation Factory
 * =================
 * 
 * Creates animations directly from MotionContext properties.
 * All configuration comes from MotionContext - no abstract configuration objects.
 * This makes it crystal clear that animations are configured from block attributes.
 */

import { MotionBlockContext } from "@/core/types";
import { 
    type AnimationType, 
    getAnimationKeyframes
} from "@/core/animations/keyframes";


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
    motionContext: MotionBlockContext,
    animationType: AnimationType
): void {
    try {
        const keyframes = getAnimationKeyframes(animationType);
        
        if (!keyframes) {
            console.error(`Unknown entrance animation type: ${animationType}`);
            return;
        }
        
        // Use MotionContext timing properties directly
        motionElement.animate(keyframes, {
            duration: motionContext.mb_duration,
            delay: motionContext.mb_delay,
            easing: motionContext.mb_speedCurve,
            fill: "forwards"
        }); // Fire and forget
        
    } catch (error) {
        console.error("Failed to create entrance animation:", error);
    }
}

