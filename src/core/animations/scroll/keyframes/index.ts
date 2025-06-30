/**
 * Scroll Animation Keyframes Index
 * =================================
 * 
 * Central export point for all scroll-driven animation keyframes.
 * Organized into separate category files for maintainability and clean imports.
 * 
 * Animation Categories:
 * - Fade: Opacity-based animations
 * - Slide: Translation-based animations  
 * - Scale: Size-transformation animations
 * - Rotate: Rotation-based animations
 */

import { FADE_SCROLL_KEYFRAMES, type FadeScrollAnimationType, FADE_SCROLL_ANIMATION_NAMES } from './fade';
import { SLIDE_SCROLL_KEYFRAMES, type SlideScrollAnimationType, SLIDE_SCROLL_ANIMATION_NAMES } from './slide';
import { SCALE_SCROLL_KEYFRAMES, type ScaleScrollAnimationType, SCALE_SCROLL_ANIMATION_NAMES } from './scale';
import { ROTATE_SCROLL_KEYFRAMES, type RotateScrollAnimationType, ROTATE_SCROLL_ANIMATION_NAMES } from './rotate';

// Automatically composed union type from all animation groups
export type ScrollAnimationType = 
	| FadeScrollAnimationType
	| SlideScrollAnimationType
	| ScaleScrollAnimationType
	| RotateScrollAnimationType;

// Combined keyframes object with automatic type inference
export const SCROLL_ANIMATION_KEYFRAMES = {
	...FADE_SCROLL_KEYFRAMES,
	...SLIDE_SCROLL_KEYFRAMES,
	...SCALE_SCROLL_KEYFRAMES,
	...ROTATE_SCROLL_KEYFRAMES
} as const;

// Automatically composed array of all animation names
export const SCROLL_ANIMATION_PRESETS: ScrollAnimationType[] = [
	...FADE_SCROLL_ANIMATION_NAMES,
	...SLIDE_SCROLL_ANIMATION_NAMES,
	...SCALE_SCROLL_ANIMATION_NAMES,
	...ROTATE_SCROLL_ANIMATION_NAMES
];

// Helper function to get keyframes for a specific animation
export function getScrollKeyframes(animationType: ScrollAnimationType): Keyframe[] {
	return SCROLL_ANIMATION_KEYFRAMES[animationType];
}

// Helper function to check if an animation type is valid
export function isValidScrollAnimation(animationType: string): animationType is ScrollAnimationType {
	return animationType in SCROLL_ANIMATION_KEYFRAMES;
}

// Organized animation groups - automatically composed from individual files
export const SCROLL_ANIMATION_GROUPS = {
	fade: FADE_SCROLL_ANIMATION_NAMES,
	slide: SLIDE_SCROLL_ANIMATION_NAMES,
	scale: SCALE_SCROLL_ANIMATION_NAMES,
	rotate: ROTATE_SCROLL_ANIMATION_NAMES
} as const;

// Export individual group types for granular usage
export type {
	FadeScrollAnimationType,
	SlideScrollAnimationType,
	ScaleScrollAnimationType,
	RotateScrollAnimationType
}; 