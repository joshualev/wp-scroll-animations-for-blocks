/**
 * Scale Enter & Leave Scroll Animation
 * ====================================
 * Scales in when entering viewport, scales out when leaving.
 * Creates a dynamic grow/shrink effect with scroll position.
 * Perfect for emphasizing content that should grab attention.
 */

export const scaleEnterLeave: Keyframe[] = [
	// Entry phase: element enters viewport
	{
		offset: 0,
		opacity: 0,
		transform: 'scale(0.8)',
	},
	{
		offset: 0.2,
		opacity: 1,
		transform: 'scale(1)',
	},
	// Stable visible phase
	{
		offset: 0.8,
		opacity: 1,
		transform: 'scale(1)',
	},
	// Exit phase: element leaves viewport
	{
		offset: 1,
		opacity: 0,
		transform: 'scale(0.8)',
	},
]; 