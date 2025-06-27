/**
 * Scroll Animation Keyframes Index
 * ================================
 * 
 * Central export point for all scroll-driven animation keyframes.
 * Organized into separate files for maintainability and clean imports.
 * 
 * Animation Categories:
 * - Entry Animations: Appear once and stay visible
 * - Enter & Leave Animations: Appear and disappear based on scroll position
 */

import { ScrollAnimationType } from "@/shared/types";

// Entry animations (appear once and stay)
import { fadeInUp } from "./fade-in-up";
import { fadeInDown } from "./fade-in-down";
import { scaleIn } from "./scale-in";
import { slideInLeft } from "./slide-in-left";
import { slideInRight } from "./slide-in-right";
import { rotateIn } from "./rotate-in";

// Enter & Leave animations (appear and disappear on scroll)
import { fadeEnterLeave } from "./fade-enter-leave";
import { scaleEnterLeave } from "./scale-enter-leave";
import { slideEnterLeave } from "./slide-enter-leave";

/**
 * Map of scroll animation types to their keyframe definitions.
 * Used by the scroll animation system to create Web Animations API animations.
 */
export const SCROLL_ANIMATION_KEYFRAMES: Record<ScrollAnimationType, Keyframe[]> = {
	// Entry animations
	[ScrollAnimationType.FADE_IN_UP]: fadeInUp,
	[ScrollAnimationType.FADE_IN_DOWN]: fadeInDown,
	[ScrollAnimationType.SCALE_IN]: scaleIn,
	[ScrollAnimationType.SLIDE_IN_LEFT]: slideInLeft,
	[ScrollAnimationType.SLIDE_IN_RIGHT]: slideInRight,
	[ScrollAnimationType.ROTATE_IN]: rotateIn,
	
	// Enter & Leave animations
	[ScrollAnimationType.FADE_ENTER_LEAVE]: fadeEnterLeave,
	[ScrollAnimationType.SCALE_ENTER_LEAVE]: scaleEnterLeave,
	[ScrollAnimationType.SLIDE_ENTER_LEAVE]: slideEnterLeave,
}; 