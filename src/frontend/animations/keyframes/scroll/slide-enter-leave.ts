/**
 * Slide Enter & Leave Scroll Animation
 * ====================================
 * Slides in from below when entering, slides out above when leaving.
 * Creates a flowing vertical movement effect with scroll position.
 * Great for content that should feel like it's flowing through the viewport.
 */

export const slideEnterLeave: Keyframe[] = [
	// Entry phase: element enters viewport from below
	{
		offset: 0,
		opacity: 0,
		transform: 'translateY(100%)',
	},
	{
		offset: 0.2,
		opacity: 1,
		transform: 'translateY(0%)',
	},
	// Stable visible phase
	{
		offset: 0.8,
		opacity: 1,
		transform: 'translateY(0%)',
	},
	// Exit phase: element leaves viewport upward
	{
		offset: 1,
		opacity: 0,
		transform: 'translateY(-100%)',
	},
]; 