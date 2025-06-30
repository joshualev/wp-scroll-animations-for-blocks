/**
 * Slide Scroll Animations
 * ========================
 * All slide-based scroll-driven animations.
 * Includes horizontal and vertical slide effects, both entry and enter/leave.
 */

// Entry slide animations (appear once and stay)
const slideInLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(-100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0%)',
	},
];

const slideInRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0%)',
	},
];

// Enter & Leave slide animations (appear and disappear on scroll)
const slideEnterLeave: Keyframe[] = [
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

// Keyframes object with proper typing
export const SLIDE_SCROLL_KEYFRAMES = {
	'slide-in-left': slideInLeft,
	'slide-in-right': slideInRight,
	'slide-enter-leave': slideEnterLeave,
} as const;

// Type definitions for this animation group
export type SlideScrollAnimationType = keyof typeof SLIDE_SCROLL_KEYFRAMES;

// Array of all available animation types for iteration/selection
export const SLIDE_SCROLL_ANIMATION_NAMES = Object.keys(SLIDE_SCROLL_KEYFRAMES) as SlideScrollAnimationType[]; 