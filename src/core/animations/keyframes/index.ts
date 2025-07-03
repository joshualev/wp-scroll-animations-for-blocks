import { BOUNCE_IN_KEYFRAMES, type BounceAnimationType, BOUNCE_ANIMATION_NAMES } from './bounce';
import { FADE_IN_KEYFRAMES, type FadeAnimationType, FADE_ANIMATION_NAMES } from './fade';
import { FLIP_IN_KEYFRAMES, type FlipAnimationType, FLIP_ANIMATION_NAMES } from './flip';
import { ROTATE_IN_KEYFRAMES, type RotateAnimationType, ROTATE_ANIMATION_NAMES } from './rotate';
import { SLIDE_IN_KEYFRAMES, type SlideAnimationType, SLIDE_ANIMATION_NAMES } from './slide';
import { ZOOM_IN_KEYFRAMES, type ZoomAnimationType, ZOOM_ANIMATION_NAMES } from './zoom';
import { ROLL_IN_KEYFRAMES, type RollAnimationType, ROLL_ANIMATION_NAMES } from './roll';

// Automatically composed union type from all animation groups
export type AnimationType = 
	| BounceAnimationType
	| FadeAnimationType
	| FlipAnimationType
	| RollAnimationType
	| RotateAnimationType
	| SlideAnimationType
	| ZoomAnimationType;

// Combined keyframes object with automatic type inference
export const ANIMATION_KEYFRAMES = {
	...BOUNCE_IN_KEYFRAMES,
	...FADE_IN_KEYFRAMES,
	...FLIP_IN_KEYFRAMES,
	...ROTATE_IN_KEYFRAMES,
	...SLIDE_IN_KEYFRAMES,
	...ZOOM_IN_KEYFRAMES,
	...ROLL_IN_KEYFRAMES
} as const;

// Automatically composed array of all animation names
export const ANIMATION_PRESETS: AnimationType[] = [
	...BOUNCE_ANIMATION_NAMES,
	...FADE_ANIMATION_NAMES,
	...FLIP_ANIMATION_NAMES,
	...ROLL_ANIMATION_NAMES,
	...ROTATE_ANIMATION_NAMES,
	...SLIDE_ANIMATION_NAMES,
	...ZOOM_ANIMATION_NAMES
];

// Helper function to get keyframes for a specific animation
export function getAnimationKeyframes(animationType: AnimationType): Keyframe[] {
	return ANIMATION_KEYFRAMES[animationType];
}

// Helper function to check if an animation type is valid
export function isValidAnimation(animationType: string): animationType is AnimationType {
	return animationType in ANIMATION_KEYFRAMES;
}

export type AnimationGroup = keyof typeof ANIMATION_GROUPS;

// Organized animation groups - automatically composed from individual files
export const ANIMATION_GROUPS = {
	bounce: BOUNCE_ANIMATION_NAMES,
	fade: FADE_ANIMATION_NAMES,
	flip: FLIP_ANIMATION_NAMES,
	roll: ROLL_ANIMATION_NAMES,
	rotate: ROTATE_ANIMATION_NAMES,
	slide: SLIDE_ANIMATION_NAMES,
	zoom: ZOOM_ANIMATION_NAMES
} as const;

// Export individual group types for granular usage
export type {
	BounceAnimationType,
	FadeAnimationType,
	FlipAnimationType,
	RollAnimationType,
	RotateAnimationType,
	SlideAnimationType,
	ZoomAnimationType
};