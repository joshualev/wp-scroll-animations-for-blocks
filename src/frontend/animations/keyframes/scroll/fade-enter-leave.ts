/**
 * Fade Enter & Leave Scroll Animation
 * ===================================
 * Fades in when entering viewport, fades out when leaving.
 * Creates a continuous show/hide effect based on scroll position.
 * Uses range-specific keyframes for entry and exit phases.
 */

export const fadeEnterLeave: Keyframe[] = [
	// Entry phase: element enters viewport
	{
		offset: 0,
		opacity: 0,
	},
	{
		offset: 0.2,
		opacity: 1,
	},
	// Stable visible phase
	{
		offset: 0.8,
		opacity: 1,
	},
	// Exit phase: element leaves viewport  
	{
		offset: 1,
		opacity: 0,
	},
]; 