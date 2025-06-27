/**
 * Slide In Right Scroll Animation
 * ================================
 * Content slides in from the right side.
 * Perfect for alternating reveals and grid layouts.
 */

export const slideInRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0%)',
	},
]; 