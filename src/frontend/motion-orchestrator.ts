/**
 * Motion Orchestrator
 * 
 * Coordinates all motion animation logic and delegates to specialized handlers.
 * This is the main entry point for animation initialization.
 */

import { MotionContext, MotionElement } from "@/shared/types";
import { initializeElementState } from "./utils/element-state";
import { createMotionOptions } from "./utils/motion-options";
import { observeElementVisibility } from "./observers/visibility-observer";

/**
 * Initializes motion animations for an element based on its configuration.
 * This is the main coordination function that sets up the entire animation lifecycle.
 * 
 * @param motionElement - Target element to animate
 * @param motionContext - Motion configuration from block attributes
 */
export function initializeMotion(motionElement: MotionElement, motionContext: MotionContext): void {
    console.log("Motion Blocks: Initializing element motion with context:", motionContext);

    // Initialize element runtime state
    initializeElementState(motionElement);

    // Create resolved motion options from context
    const motionOptions = createMotionOptions(motionContext);
    console.log("Motion Blocks: Resolved motion options:", motionOptions);

    // Start observing for element visibility to trigger entrance animation
    observeElementVisibility(motionElement, motionContext, motionOptions);
} 