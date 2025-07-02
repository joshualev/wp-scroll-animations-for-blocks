/**
 * Fade Scroll Animations
 * ======================
 * All fade-based scroll-driven animations.
 * Includes entry animations and enter/leave effects.
 */

// Entry fade animations (appear once and stay)
const fadeInUp: Keyframe[] = [
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

const fadeInDown: Keyframe[] = [
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

// Enter & Leave fade animations (appear and disappear on scroll)
const fadeEnterLeave: Keyframe[] = [
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

// Keyframes object with proper typing
export const FADE_SCROLL_KEYFRAMES = {
	'fade-in-up': fadeInUp,
	'fade-in-down': fadeInDown,
	'fade-enter-leave': fadeEnterLeave,
} as const;

// Type definitions for this animation group
export type FadeScrollAnimationType = keyof typeof FADE_SCROLL_KEYFRAMES;

// Array of all available animation types for iteration/selection
export const FADE_SCROLL_ANIMATION_NAMES = Object.keys(FADE_SCROLL_KEYFRAMES) as FadeScrollAnimationType[]; 