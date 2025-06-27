/**
 * Rotate In Scroll Animation
 * ==========================
 * Dynamic animation with rotation and scale.
 * Great for special elements and creative reveals.
 */

export const rotateIn: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'rotate(-10deg) scale(0.9)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'rotate(0deg) scale(1)',
	},
]; 