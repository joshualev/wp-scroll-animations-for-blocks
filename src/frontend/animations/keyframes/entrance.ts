/**
 * Entrance Animation Keyframes
 * ============================
 * 
 * Centralized export of all entrance animation keyframes.
 * Maps AnimationType enum values to their corresponding keyframe definitions.
 */

import { EntranceAnimationType } from "@/shared/types";

// Import all keyframe definitions
import { 
	bounceInDown, 
	bounceInUp, 
	bounceInLeft, 
	bounceInRight 
} from "./entrance/bounce";

import { 
	fadeIn, 
	fadeInDown, 
	fadeInLeft, 
	fadeInRight, 
	fadeInUp 
} from "./entrance/fade-in";

import { 
	flipInX, 
	flipInY 
} from "./entrance/flip-in";

import { rollIn } from "./entrance/roll-in";

import { 
	rotateIn, 
	rotateInDownLeft, 
	rotateInDownRight, 
	rotateInUpLeft, 
	rotateInUpRight 
} from "./entrance/rotate-in";

import { 
	slideInDown, 
	slideInLeft, 
	slideInRight, 
	slideInUp 
} from "./entrance/slide-in";

import { 
	zoomIn, 
	zoomInDown, 
	zoomInLeft, 
	zoomInRight, 
	zoomInUp 
} from "./entrance/zoom-in";

/**
 * Map of animation types to their keyframe definitions.
 * Used by the animation system to look up keyframes by AnimationType.
 */
export const ENTRANCE_ANIMATION_KEYFRAMES: Record<EntranceAnimationType, Keyframe[]> = {
	// Bouncing Entrances
	[EntranceAnimationType.BOUNCE_IN]: bounceInDown, // Default bounce uses bounceInDown
	[EntranceAnimationType.BOUNCE_IN_DOWN]: bounceInDown,
	[EntranceAnimationType.BOUNCE_IN_LEFT]: bounceInLeft,
	[EntranceAnimationType.BOUNCE_IN_RIGHT]: bounceInRight,
	[EntranceAnimationType.BOUNCE_IN_UP]: bounceInUp,

	// Fading Entrances
	[EntranceAnimationType.FADE_IN]: fadeIn,
	[EntranceAnimationType.FADE_IN_DOWN]: fadeInDown,
	[EntranceAnimationType.FADE_IN_LEFT]: fadeInLeft,
	[EntranceAnimationType.FADE_IN_RIGHT]: fadeInRight,
	[EntranceAnimationType.FADE_IN_UP]: fadeInUp,

	// Flipping Entrances
	[EntranceAnimationType.FLIP_IN_X]: flipInX,
	[EntranceAnimationType.FLIP_IN_Y]: flipInY,

	// Sliding Entrances
	[EntranceAnimationType.SLIDE_IN_DOWN]: slideInDown,
	[EntranceAnimationType.SLIDE_IN_LEFT]: slideInLeft,
	[EntranceAnimationType.SLIDE_IN_RIGHT]: slideInRight,
	[EntranceAnimationType.SLIDE_IN_UP]: slideInUp,

	// Zooming Entrances
	[EntranceAnimationType.ZOOM_IN]: zoomIn,
	[EntranceAnimationType.ZOOM_IN_DOWN]: zoomInDown,
	[EntranceAnimationType.ZOOM_IN_LEFT]: zoomInLeft,
	[EntranceAnimationType.ZOOM_IN_RIGHT]: zoomInRight,
	[EntranceAnimationType.ZOOM_IN_UP]: zoomInUp,

	// Rotating Entrances
	[EntranceAnimationType.ROTATE_IN]: rotateIn,
	[EntranceAnimationType.ROTATE_IN_DOWN_LEFT]: rotateInDownLeft,
	[EntranceAnimationType.ROTATE_IN_DOWN_RIGHT]: rotateInDownRight,
	[EntranceAnimationType.ROTATE_IN_UP_LEFT]: rotateInUpLeft,
	[EntranceAnimationType.ROTATE_IN_UP_RIGHT]: rotateInUpRight,

	// Specials
	[EntranceAnimationType.ROLL_IN]: rollIn,
};

