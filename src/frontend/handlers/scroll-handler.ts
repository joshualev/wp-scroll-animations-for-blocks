/**
 * Scroll Animation Handler
 * 
 * Handles setup and management of scroll-driven animations.
 * Manages browser support detection and animation creation.
 */

import { MotionContext, MotionElement, MotionState } from "@/shared/types";
import { createScrollAnimation } from "@/frontend/animations/create-scroll-animation";
import { getScrollAnimationType } from "@/frontend/utils/get-animation-type";

/**
 * Sets up scroll-driven animation using Web Animations API.
 * This is called after an element has completed its entrance animation
 * and has been scrolled out and back into the viewport.
 * 
 * @param motionElement - Target element for scroll animation
 * @param motionContext - Motion configuration
 */
export function setupScrollAnimation(motionElement: MotionElement, motionContext: MotionContext): void {
	/**
	 * Detects ViewTimeline API support for scroll-driven animations.
	 * @returns `true` if browser supports CSS scroll-driven animations
	 */
	function supportsViewTimeline(): boolean {
		// Check for CSS.supports if available
		if (typeof CSS !== 'undefined' && CSS.supports) {
			const supports = CSS.supports('animation-timeline', 'view()');
			console.log(
				`Motion Blocks: CSS.supports('animation-timeline', 'view()') = ${supports}`
			);
			return supports;
		}
		return false;
	}

	// Check browser support early
	if (!supportsViewTimeline()) {
		console.warn(
			'Motion Blocks: Browser does not support scroll-driven animations. Entrance animation will remain static.'
		);
		motionElement._motionState = MotionState.SCROLL_READY;
		return;
	}

	// Convert string type to enum safely
	const animationType = getScrollAnimationType(motionContext.scrollAnimationType);
	
	if (!animationType) {
		console.warn(
			`Motion Blocks: Invalid animation type for scroll: ${motionContext.scrollAnimationType}`
		);
		return;
	}

	// Create scroll animation
	const animation = createScrollAnimation({
		motionElement: motionElement,
		animationType: animationType,
		completionPoint: motionContext.scrollCompletionPoint,
	});

	if (animation) {
		motionElement._motionState = MotionState.SCROLL_ACTIVE;
		// Ensure the animations object exists before assigning to it.
		if (!motionElement._animations) {
			motionElement._animations = {};
		}
		motionElement._animations.scroll = animation;
	} else {
		// Graceful fallback if creation fails
		console.warn(
			'Motion Blocks: Failed to create scroll animation, falling back to a static visible state.'
		);
		motionElement.style.opacity = '1';
		motionElement._motionState = MotionState.SCROLL_READY;
	}
} 