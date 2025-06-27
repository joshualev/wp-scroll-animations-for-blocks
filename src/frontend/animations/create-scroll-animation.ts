/**
 * Scroll Animation Logic
 * ======================
 * 
 * Handles the creation and management of scroll-driven animations using Web Animations API
 * with ViewTimeline. These animations are tied to the scroll position of elements.
 * 
 * ANIMATION RANGE SYSTEM:
 * The rangeStart/rangeEnd properties control WHEN the animation runs during scroll, not HOW FAST.
 * 
 * Key concepts:
 * - "entry": When element starts entering the viewport (top edge touches bottom of viewport)
 * - "cover": The period when element is crossing/covering the viewport 
 * - "exit": When element starts leaving the viewport (bottom edge touches top of viewport)
 * 
 * Our completionPoint system:
 * - completionPoint: 30 → rangeStart: "entry 0%", rangeEnd: "cover 30%" 
 *   (Animation starts when element enters, completes when 30% through the cover phase)
 * - completionPoint: 70 → rangeStart: "entry 0%", rangeEnd: "cover 70%"
 *   (Animation starts when element enters, completes when 70% through the cover phase)
 * 
 * This gives users intuitive control: "At what point in the scroll should my animation finish?"
 */

import { MotionElement, ScrollAnimationType } from "@/shared/types";
import { SCROLL_ANIMATION_KEYFRAMES } from "@/frontend/animations/keyframes/scroll";
import { RangeControl } from '@wordpress/components';

/**
 * Configuration options for ViewTimeline scroll-driven animations.
 * 
 * Properties:
 * - subject: The element being observed for scroll position
 * - axis: Scroll direction to track ('block' = vertical, 'inline' = horizontal)
 * - inset: Viewport offset that defines when animation starts/ends
 * 
 * About inset:
 * Defines the "active zone" within the viewport where the animation occurs.
 * Works like CSS inset property with 1-4 values defining offsets from viewport edges.
 * 
 * Positive values (shrink active zone):
 * - '' (empty): Uses full viewport (default behavior)
 * - '10%': 10% inset from all sides (animation active in center 80% of viewport)
 * - '20% 0%': 20% top/bottom inset, 0% left/right inset
 * - '10% 20% 30% 40%': top, right, bottom, left insets respectively
 * - '100px': 100px inset from all sides
 * 
 * Negative values (expand active zone beyond viewport):
 * - '-10%': Expand 10% beyond viewport on all sides
 * - '-20% 0%': Expand 20% above/below viewport, stay at viewport left/right edges
 * - '-100px 0px': Expand 100px above/below viewport, stay at viewport edges
 * 
 * Common use cases:
 * - '': Default - animation starts when element enters viewport, ends when it exits
 * - '20%': Animation starts when element is 20% into viewport, ends 20% before exit
 * - '50%': Animation only active when element crosses center 50% of viewport
 * - '-20%': Animation starts 20% before element enters viewport, ends 20% after exit
 * - '-10% 0%': Animation starts/ends early vertically, but stays within horizontal bounds
 * 
 * For constrained scroll spaces:
 * - '-50% 0%': Ensures animation reaches 100% even with limited vertical scroll room
 * - '-30%': Good balance for most layouts where scroll space might be limited
 */
interface ViewTimelineOptions {
    subject: MotionElement;
    axis?: 'block' | 'inline' | 'vertical' | 'horizontal';
    inset?: string;
}

declare const ViewTimeline: {
    new (options?: ViewTimelineOptions): AnimationTimeline & {
        readonly currentTime: number | null;
    };
};

interface ScrollAnimationOptions {
	motionElement: MotionElement;
	animationType: ScrollAnimationType;
	completionPoint: number;
}

/**
 * Creates a scroll-driven animation using Web Animations API with ViewTimeline.
 * This function now uses a simple, direct approach, relying on clean
 * "entrance-and-hold" keyframes and proper state management from the handler.
 *
 * @param motionElement - Target element to animate
 * @param animationType - Animation type to apply
 * @returns Animation instance or null if failed
 */
export function createScrollAnimation({
	motionElement,
	animationType,
	completionPoint,
}: ScrollAnimationOptions): Animation | null {
	try {
		const keyframes = SCROLL_ANIMATION_KEYFRAMES[animationType];
		if (!keyframes) {
			console.error(
				`Motion Blocks: Unknown animation type: ${animationType}`
			);
			return null;
		}

		// Create the timeline. No complex insets needed as the keyframes
		// and state management now handle the visual alignment.
		const timeline = new ViewTimeline({ subject: motionElement, axis: 'block' });

		// Create the animation with core properties
		const animation = motionElement.animate(keyframes, {
			duration: 1, // Duration is 1 because the timeline dictates the progress.
			fill: 'both',
			timeline: timeline,
		});

		// All scroll animations now use the completion point to determine their end.
		// This simplifies the logic and makes the behavior consistent.
		const safeCompletionPoint = Math.max(10, Math.min(90, completionPoint));
		
		// Set range properties on the created animation object
		(animation as any).rangeStart = 'entry 0%';
		(animation as any).rangeEnd = `cover ${safeCompletionPoint}%`;

		return animation;
	} catch (error) {
		console.error('Motion Blocks: Failed to create scroll animation:', error);
		return null;
	}
}
