/**
 * Rotate Scroll Animations
 * =========================
 * All rotate-based scroll-driven animations.
 * Creates dynamic rotation effects for creative reveals.
 */

// Entry rotate animations (appear once and stay)
const rotateIn: Keyframe[] = [
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

// Keyframes object with proper typing
export const ROTATE_SCROLL_KEYFRAMES = {
	'rotate-in': rotateIn,
} as const;

// Type definitions for this animation group
export type RotateScrollAnimationType = keyof typeof ROTATE_SCROLL_KEYFRAMES;

// Array of all available animation types for iteration/selection
export const ROTATE_SCROLL_ANIMATION_NAMES = Object.keys(ROTATE_SCROLL_KEYFRAMES) as RotateScrollAnimationType[]; 