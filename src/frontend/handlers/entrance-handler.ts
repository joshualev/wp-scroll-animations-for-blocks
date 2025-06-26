/**
 * Entrance Animation Handler
 * 
 * Handles creation and management of entrance animations.
 * Manages animation lifecycle and transitions to scroll animations.
 */

import { MotionContext, MotionElement, MotionOptions, MotionState } from "@/shared/types";
import { createEntranceAnimation } from "@/frontend/animations/create-entrance-animation";
import { getAnimationType } from "@/frontend/utils/get-animation-type";
import { observeScrollTransition } from "@/frontend/observers/scroll-observer";

/**
 * Starts the entrance animation for an element and manages its lifecycle.
 * 
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration
 * @param motionOptions - Animation timing options
 */
export function startEntranceAnimation(
    motionElement: MotionElement,
    motionContext: MotionContext,
    motionOptions: MotionOptions
): void {
    console.log(`Motion Blocks: Starting entrance animation with type: ${motionContext.motionType}`);
    motionElement._motionState = MotionState.ENTRY_PLAYING;

    // Convert string type to enum safely
    const animationType = getAnimationType(motionContext.motionType);
    if (!animationType) {
        console.warn(`Motion Blocks: Invalid animation type: ${motionContext.motionType}`);
        fallbackToVisible(motionElement);
        return;
    }

    const animation = createEntranceAnimation({
        motionElement: motionElement,
        animationType: animationType,
        timing: motionOptions
    });

    if (!animation) {
        console.warn("Motion Blocks: Failed to create entrance animation");
        fallbackToVisible(motionElement);
        return;
    }

    // Store animation reference
    motionElement._animations!.entrance = animation;

    // Handle animation completion
    animation.addEventListener("finish", () => {
        onEntranceComplete(motionElement, motionContext);
    });

    animation.addEventListener("cancel", () => {
        console.warn("Motion Blocks: Entrance animation was cancelled");
        fallbackToVisible(motionElement);
    });
}

/**
 * Handles entrance animation completion and potential scroll animation setup.
 * 
 * @param motionElement - Element that finished entrance animation
 * @param motionContext - Motion configuration
 */
function onEntranceComplete(motionElement: MotionElement, motionContext: MotionContext): void {
    motionElement._motionState = MotionState.ENTRY_COMPLETE;
    console.log("Motion Blocks: Entrance animation completed");

    // Set up scroll animation if enabled
    if (motionContext.motionScrollEnabled) {
        observeScrollTransition(motionElement, motionContext);
    }
}

/**
 * Fallback function to ensure element visibility when animation fails.
 * 
 * @param motionElement - Element to make visible
 */
function fallbackToVisible(motionElement: MotionElement): void {
    motionElement.style.opacity = "1";
    motionElement._motionState = MotionState.ENTRY_COMPLETE;
} 