/**
 * Scroll Animations Constants
 *
 * This module contains all constants used throughout the scroll animations plugin.
 * Using constants helps prevent typos and makes the code more maintainable.
 *
 * @since 2.0.0
 */

/**
 * Available animation types
 * @readonly
 * @enum {string}
 */
export const ANIMATION_TYPES = Object.freeze({
	/** Simple opacity fade animation */
	FADE: "fade",
	SLIDE: "slide",
	SPRING: "spring"
});

/**
 * Available animation directions (used with slide animations)
 * @readonly
 * @enum {string}
 */
export const ANIMATION_DIRECTIONS = Object.freeze({
	CENTER: "center",
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right"
});

/**
 * Default animation settings
 * @readonly
 * @type {Object}
 */
export const DEFAULT_SETTINGS = Object.freeze({
	/** Whether animations are enabled by default */
	ENABLED: false,
	/** Default animation type */
	TYPE: ANIMATION_TYPES.FADE,
	/** Default animation direction */
	DIRECTION: ANIMATION_DIRECTIONS.CENTER,
	/** Default intersection observer threshold (0-1) */
	THRESHOLD: 0.5,
	/** Default animation duration in milliseconds */
	DURATION: 1000,
	/** Default animation delay in milliseconds */
	DELAY: 0,
	/** Whether animations should repeat on every intersection */
	REPEAT: false
});

/**
 * Animation distance for slide effects
 * @readonly
 * @type {string}
 */
export const ANIMATION_DISTANCE = "20px";

/**
 * Scale values for different animation types
 * @readonly
 * @type {Object}
 */
export const ANIMATION_SCALE = Object.freeze({
	/** Scale value for slide center animations */
	SLIDE_CENTER: "0.95",
	/** Scale value for spring animations */
	SPRING: "0.9"
});

/**
 * CSS timing functions for animations
 * @readonly
 * @type {Object}
 */
export const TIMING_FUNCTIONS = Object.freeze({
	/** Standard ease-out timing */
	EASE_OUT: "ease-out",
	/** Spring/bounce timing function */
	SPRING: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
});

/**
 * CSS custom property names
 * @readonly
 * @type {Object}
 */
export const CSS_PROPERTIES = Object.freeze({
	DURATION: "--animation-duration",
	DELAY: "--animation-delay",
	TIMING: "--animation-timing"
});

/**
 * Plugin namespace for the Interactivity API
 * @readonly
 * @type {string}
 */
export const PLUGIN_NAMESPACE = "scroll-animations";
