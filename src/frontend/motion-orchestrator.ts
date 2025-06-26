/**
 * Motion Orchestrator
 * 
 * Coordinates all motion animation logic and delegates to specialized handlers.
 * This is the main entry point for animation initialization.
 */

import { MotionContext, MotionElement, MotionState, EntranceAnimationOptions, ScrollAnimationOptions } from "@/shared/types";
import { observeElementVisibility } from "./observers/visibility-observer";
import { startEntranceAnimation } from "./handlers/entrance-handler";
import { setupScrollAnimation } from "./handlers/scroll-handler";
import { getElementVisibility } from "./utils/element-visibility";
import { calculateVisibilityThreshold } from "./utils/calculate-visibility-threshold";

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
	motionElement: MotionElement,
	motionContext: MotionContext
): void {
	console.log(
		'Motion Blocks: Initializing element motion with context:',
		motionContext
	);

	// Initialize element runtime state
	initializeElementState(motionElement);

	const threshold = calculateVisibilityThreshold(motionContext.motionThreshold || 30);
	const visibility = getElementVisibility(motionElement, threshold);
	const entranceOptions = createEntranceAnimationOptions(motionContext);

	console.log(`Motion Blocks: Element visibility check - ratio: ${(visibility.visibilityRatio * 100).toFixed(1)}%, threshold: ${(threshold * 100).toFixed(1)}%, meetsThreshold: ${visibility.meetsThreshold}`);

	if (visibility.meetsThreshold) {
		// Element is fully visible on load - choose appropriate animation
		if (motionContext.scrollAnimationEnabled) {
			console.log(
				'Motion Blocks: Element meets threshold on load. Setting up scroll animation.'
			);
			setupScrollAnimation(motionElement, motionContext);
		} else {
			console.log(
				'Motion Blocks: Element meets threshold on load. Starting entrance animation.'
			);
			startEntranceAnimation(motionElement, motionContext, entranceOptions);
		}
	} else {
		// Element is off-screen. Set up appropriate observer based on animation type.
		if (motionContext.scrollAnimationEnabled) {
			console.log(
				'Motion Blocks: Element is off-screen. Setting up scroll animation observer.'
			);
			// For scroll animations, we still need an observer to trigger when visible
			observeElementVisibility(motionElement, motionContext, null);
		} else {
			console.log(
				'Motion Blocks: Element is off-screen. Setting up entrance animation observer.'
			);
			observeElementVisibility(motionElement, motionContext, entranceOptions);
		}
	}
}

/**
 * Initializes runtime state properties on a motion element.
 * This sets up the element for animation tracking and management.
 * 
 * @param motionElement - Target element to initialize
 */
function initializeElementState(motionElement: MotionElement): void {
	motionElement._motionState = MotionState.IDLE;
	motionElement._animations = {};
	motionElement._observers = [];
}

/**
 * Creates entrance animation options from WordPress block context.
 * Handles time-based animation properties.
 * 
 * @param motionContext - Motion configuration from block attributes
 * @returns Entrance animation options with timing and threshold
 */
export function createEntranceAnimationOptions(motionContext: MotionContext): EntranceAnimationOptions {
	return {
		duration: motionContext.motionDuration || 600,
		delay: motionContext.motionDelay || 0,
		easing: motionContext.motionTimingFunction || "ease-out",
		fill: "forwards",
		threshold: calculateVisibilityThreshold(motionContext.motionThreshold || 30)
	};
}

/**
 * Creates scroll animation options from WordPress block context.
 * Handles position-based animation properties.
 * 
 * @param motionContext - Motion configuration from block attributes
 * @returns Scroll animation options with fill and threshold
 */
export function createScrollAnimationOptions(motionContext: MotionContext): ScrollAnimationOptions {
	return {
		fill: "both",
		threshold: calculateVisibilityThreshold(motionContext.motionThreshold || 30)
	};
}


