/**
 * Entrance Animation Handler
 * 
 * Manages entrance animation lifecycle and transition to scroll animations.
 */

import { MotionContext, MotionElement, EntranceAnimationOptions, MotionState, EntranceAnimationType } from "@/shared/types";
import { getEntranceAnimationType } from "@/frontend/utils/get-animation-type";
import { createEntranceAnimation } from "@/frontend/animations/create-entrance-animation";



/**
 * Initiates entrance animation for an element.
 * Sets up the animation and handles state transitions.
 * 
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration from block attributes
 * @param entranceOptions - Entrance animation timing and threshold options
 */
export function startEntranceAnimation(
    motionElement: MotionElement,
    motionContext: MotionContext,
    entranceOptions: EntranceAnimationOptions
): void {
    console.log("Motion Blocks: Starting entrance animation");
    
    // Update element state
    motionElement._motionState = MotionState.ENTRY_PLAYING;
    
    // Get animation type from context
    const animationType = getEntranceAnimationType(motionContext.entranceAnimationType);
    if (!animationType) {
        console.warn("Motion Blocks: No valid animation type found");
        return;
    }
    
    // Create and start entrance animation using correct function signature
    const animation = createEntranceAnimation({
        motionElement: motionElement,
        animationType: animationType,
        timing: {
            duration: entranceOptions.duration,
            delay: entranceOptions.delay,
            easing: entranceOptions.easing,
            fill: entranceOptions.fill
        }
    });
    
    // Handle null return from animation creation
    if (!animation) {
        console.warn("Motion Blocks: Failed to create entrance animation");
        return;
    }
    
    // Store animation reference
    if (!motionElement._animations) {
        motionElement._animations = {};
    }
    motionElement._animations.entrance = animation;
    
    // Handle animation completion
    animation.addEventListener("finish", () => {
        console.log("Motion Blocks: Entrance animation completed");
        motionElement._motionState = MotionState.ENTRY_COMPLETE;
        
        // Entrance animation complete - no further setup needed
        // Scroll animations are handled separately in the motion orchestrator
    });
    
    // Start the animation
    animation.play();
} 