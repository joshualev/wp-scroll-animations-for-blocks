/**
 * Motion Initialization
 * =====================
 * 
 * Simple entry point for initializing Motion Blocks animations.
 * Sets up visibility observation to trigger animations when elements come into view.
 */

import { MotionBlockContext } from "@/core/types";
import { observeElementAndTriggerMotion } from "@/core/motion-trigger";

/**
 * Initializes motion animations for an element based on its configuration.
 * 
 * This is the main entry point that sets up visibility observation
 * to trigger animations when the element comes into view.
 *
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration from block attributes
 */
export function initializeMotion(
	motionElement: HTMLElement,
	motionContext: MotionBlockContext
): void {
    // Set up observer to trigger animation when element becomes visible
    observeElementAndTriggerMotion(motionElement, motionContext);
} 