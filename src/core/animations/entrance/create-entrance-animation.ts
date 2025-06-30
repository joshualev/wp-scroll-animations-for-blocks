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
    ENTRANCE_ANIMATION_KEYFRAMES 
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
): Animation | null {
    try {
        const keyframes = ENTRANCE_ANIMATION_KEYFRAMES[animationType];
        
        if (!keyframes) {
            console.error(`Unknown entrance animation type: ${animationType}`);
            return null;
        }
        
        // Use MotionContext timing properties directly
        return motionElement.animate(keyframes, {
            duration: motionContext.motionDuration,
            delay: motionContext.motionDelay,
            easing: motionContext.motionTimingFunction,
            fill: "forwards"
        });
        
    } catch (error) {
        console.error("Failed to create entrance animation:", error);
        return null;
    }
}



// Helper function to get keyframes for a specific animation
function getEntranceKeyframes(animationType: EntranceAnimationType): Keyframe[] {
	return ENTRANCE_ANIMATION_KEYFRAMES[animationType];
}

// Helper function to check if an animation type is valid
function isValidEntranceAnimation(animationType: string): animationType is EntranceAnimationType {
	return animationType in ENTRANCE_ANIMATION_KEYFRAMES;
}