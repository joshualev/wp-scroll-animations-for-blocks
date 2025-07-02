/**
 * Scroll Animations Index
 * ========================
 * 
 * Main export point for all scroll-driven animations.
 * Provides a clean API for working with scroll animations.
 */

export {
	SCROLL_ANIMATION_KEYFRAMES,
	SCROLL_ANIMATION_PRESETS,
	SCROLL_ANIMATION_GROUPS,
	getScrollKeyframes,
	isValidScrollAnimation,
	type ScrollAnimationType,
} from './keyframes';

export { createScrollAnimation } from './create-scroll-animation';