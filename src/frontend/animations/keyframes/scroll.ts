/**
 * Scroll-Driven Animation Keyframes
 * =================================
 * 
 * High-quality scroll reveal animations inspired by modern web design.
 * These animations create smooth, engaging reveals as elements enter the viewport.
 * All animations start invisible/transformed and end in their final state.
 */

import { ScrollAnimationType } from "@/shared/types";

/**
 * Scroll Animation Keyframes
 * ==========================
 * 
 * Reveal animations that progress with scroll position using ViewTimeline API.
 * These use standard 0-1 keyframe progression controlled by CSS animation-range.
 * 
 * Animation timing is controlled via the user-configurable animation-range property:
 * - Default: "entry 0% cover 50%" (animates from element entry to 50% coverage)
 * - Custom: User can specify any valid CSS animation-range value
 * 
 * Examples:
 * - "entry 0% cover 30%" - Animation completes when element is 30% covered
 * - "entry 10% exit 90%" - Animation from 10% entry to 90% exit
 * - "contain 0% contain 100%" - Animation throughout contain phase
 * 
 * Designed to work beautifully with any content type (text, images, cards, etc).
 */

// Fade in from below - classic smooth reveal
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

// Fade in from above - great for headers
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

// Scale in with fade - creates a "pop" effect
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

// Slide in from left - great for content cards
export const slideInLeft: Keyframe[] = [
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

// Slide in from right - alternating reveals
export const slideInRight: Keyframe[] = [
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

// Rotate in with fade - dynamic for special elements
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

/**
 * Map of scroll animation types to their keyframe definitions.
 */
export const SCROLL_ANIMATION_KEYFRAMES: Record<ScrollAnimationType, Keyframe[]> = {
	[ScrollAnimationType.FADE_IN_UP]: fadeInUp,
	[ScrollAnimationType.FADE_IN_DOWN]: fadeInDown,
	[ScrollAnimationType.SCALE_IN]: scaleIn,
	[ScrollAnimationType.SLIDE_IN_LEFT]: slideInLeft,
	[ScrollAnimationType.SLIDE_IN_RIGHT]: slideInRight,
	[ScrollAnimationType.ROTATE_IN]: rotateIn,
};
