/**
 * Scale Scroll Animations
 * ========================
 * All scale-based scroll-driven animations.
 * Creates dynamic grow/shrink effects perfect for emphasis.
 */

// Entry scale animations (appear once and stay)
const scaleIn: Keyframe[] = [
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

// Enter & Leave scale animations (appear and disappear on scroll)
const scaleEnterLeave: Keyframe[] = [
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

// Keyframes object with proper typing
export const SCALE_SCROLL_KEYFRAMES = {
	'scale-in': scaleIn,
	'scale-enter-leave': scaleEnterLeave,
} as const;

// Type definitions for this animation group
export type ScaleScrollAnimationType = keyof typeof SCALE_SCROLL_KEYFRAMES;

// Array of all available animation types for iteration/selection
export const SCALE_SCROLL_ANIMATION_NAMES = Object.keys(SCALE_SCROLL_KEYFRAMES) as ScaleScrollAnimationType[]; 