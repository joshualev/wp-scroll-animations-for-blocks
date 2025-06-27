/**
 * Fade In Up Scroll Animation
 * ===========================
 * Classic reveal animation that fades in from below.
 * Perfect for text content, cards, and general reveals.
 */

export const fadeInUp: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateY(100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateY(0%)',
	},
]; 