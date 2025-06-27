/**
 * Fade In Down Scroll Animation
 * =============================
 * Reveal animation that fades in from above.
 * Great for headers and content that should appear to drop in.
 */

export const fadeInDown: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateY(-100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateY(0%)',
	},
]; 