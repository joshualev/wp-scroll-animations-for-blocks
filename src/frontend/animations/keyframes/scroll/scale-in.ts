/**
 * Scale In Scroll Animation
 * =========================
 * Smooth scale animation that creates a "pop" effect.
 * Perfect for emphasizing important content and CTAs.
 */

export const scaleIn: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'scale(0.8)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale(1)',
	},
]; 