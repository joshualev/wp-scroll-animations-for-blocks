/**
 * Motion Orchestrator
 * ===================
 * 
 * Coordinates all motion animation logic and delegates to specialized handlers.
 * This is the main entry point for animation initialization.
 */

import { MotionContext } from "@/core/types";
import { observeElementVisibility } from "@/core/observers/visibility-observer";


/**
 * Initializes motion animations for an element based on its configuration.
 * This function is the main entry point and orchestrates the animation lifecycle
 * by determining the element's initial visibility and choosing the correct
 * animation path.
 *
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration from block attributes
 */
export function initializeMotion(
	motionElement: HTMLElement,
	motionContext: MotionContext
): void {
    // Element is off-screen. Set up an observer to trigger animation when visible.
    observeElementVisibility(motionElement, motionContext );
}

