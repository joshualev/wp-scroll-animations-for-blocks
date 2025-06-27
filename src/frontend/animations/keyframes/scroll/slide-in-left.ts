/**
 * Slide In Left Scroll Animation
 * ===============================
 * Content slides in from the left side.
 * Great for content cards and alternating layouts.
 */

export const slideInLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(-100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0%)',
	},
]; 