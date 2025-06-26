/**
 * Motion Blocks Type System
 * 
 * Complete type definitions for the Motion Blocks WordPress plugin.
 */

/* Core Enums */

/**
 * Entrance animation types - play when element becomes visible
 */
export enum EntranceAnimationType {
	// Bouncing Entrances
	BOUNCE_IN = 'bounce-in',
	BOUNCE_IN_DOWN = 'bounce-in-down',
	BOUNCE_IN_LEFT = 'bounce-in-left',
	BOUNCE_IN_RIGHT = 'bounce-in-right',
	BOUNCE_IN_UP = 'bounce-in-up',

	// Fading Entrances
	FADE_IN = 'fade-in',
	FADE_IN_DOWN = 'fade-in-down',
	FADE_IN_LEFT = 'fade-in-left',
	FADE_IN_RIGHT = 'fade-in-right',
	FADE_IN_UP = 'fade-in-up',

	// Flipping Entrances
	FLIP_IN_X = 'flip-in-x',
	FLIP_IN_Y = 'flip-in-y',

	// Sliding Entrances
	SLIDE_IN_DOWN = 'slide-in-down',
	SLIDE_IN_LEFT = 'slide-in-left',
	SLIDE_IN_RIGHT = 'slide-in-right',
	SLIDE_IN_UP = 'slide-in-up',

	// Zooming Entrances
	ZOOM_IN = 'zoom-in',
	ZOOM_IN_DOWN = 'zoom-in-down',
	ZOOM_IN_LEFT = 'zoom-in-left',
	ZOOM_IN_RIGHT = 'zoom-in-right',
	ZOOM_IN_UP = 'zoom-in-up',

	// Rotating Entrances
	ROTATE_IN = 'rotate-in',
	ROTATE_IN_DOWN_LEFT = 'rotate-in-down-left',
	ROTATE_IN_DOWN_RIGHT = 'rotate-in-down-right',
	ROTATE_IN_UP_LEFT = 'rotate-in-up-left',
	ROTATE_IN_UP_RIGHT = 'rotate-in-up-right',

	// Specials
	ROLL_IN = 'roll-in',
}



/**
 * Scroll animation types - progress with scroll position
 */
export enum ScrollAnimationType {
	// Reveal animations that work well with any content
	FADE_IN_UP = 'fade-in-up',
	FADE_IN_DOWN = 'fade-in-down', 
	SCALE_IN = 'scale-in',
	SLIDE_IN_LEFT = 'slide-in-left',
	SLIDE_IN_RIGHT = 'slide-in-right',
	ROTATE_IN = 'rotate-in',
}

/**
 * Combined animation type for backwards compatibility
 */
export type AnimationType = EntranceAnimationType | ScrollAnimationType;

/**
 * Animation lifecycle states for tracking element progression.
 * Used to manage the animation flow from idle through entry and scroll phases.
 */
export enum MotionState {
    IDLE = "idle",
    ENTRY_PLAYING = "entry_playing", 
    ENTRY_COMPLETE = "entry_complete",
    SCROLL_READY = "scroll_ready",
    SCROLL_ACTIVE = "scroll_active"
}

/* Constants & Basic Types */

/**
 * Array of all available entrance animation types for iteration.
 */
export const ENTRANCE_ANIMATION_PRESETS = Object.values(EntranceAnimationType);



/**
 * Array of all available scroll animation types for iteration.
 */
export const SCROLL_ANIMATION_PRESETS = Object.values(ScrollAnimationType);

/**
 * String literal type for animation type values.
 */
export type AnimationTypeValue = `${AnimationType}`;

/* Configuration Interfaces */

/**
 * Block configuration passed from PHP to frontend via data-wp-context.
 * Contains all user-configured animation settings from the WordPress editor.
 * 
 * Properties:
 * - motionEnabled: Whether motion animations are enabled for this block
 * - entranceAnimationType: Entrance animation type, or "none" to disable
 * - scrollAnimationType: Scroll animation type, or "none" to disable
 * - motionDuration: Animation duration in milliseconds
 * - motionDelay: Delay before animation starts in milliseconds  
 * - motionTimingFunction: CSS easing function name
 * - motionThreshold: Animation threshold percentage (0-100) - applies to both entrance and scroll
 * - scrollAnimationEnabled: Whether scroll-based animations are enabled
 */
export interface MotionContext {
    motionEnabled: boolean;
    entranceAnimationType: EntranceAnimationType | "none";
    scrollAnimationType: ScrollAnimationType | "none";
    motionDuration: number;
    motionDelay: number;
    motionTimingFunction: string;
    motionThreshold: number;
    scrollAnimationEnabled: boolean;
    scrollCompletionPoint: number;
}

/**
 * Configuration for entrance animations (time-based).
 * Used for animations that play once when element becomes visible.
 * 
 * Properties:
 * - duration: Animation duration in milliseconds
 * - delay: Delay before animation starts in milliseconds
 * - easing: CSS easing function
 * - fill: How animation behaves after completion
 * - threshold: Viewport visibility threshold (0-1) for triggering animation
 */
export interface EntranceAnimationOptions {
    duration: number;
    delay: number;
    easing: string;
    fill: "forwards" | "both";
    threshold: number;
}

/**
 * Configuration for scroll-driven animations (position-based).
 * Used for animations that progress with scroll position rather than time.
 * 
 * Properties:
 * - fill: How animation behaves after completion
 * - threshold: Viewport visibility threshold (0-1) for detecting element presence
 */
export interface ScrollAnimationOptions {
    fill: "forwards" | "both";
    threshold: number;
}

/**
 * Basic Web Animations API timing configuration.
 * Minimal interface for standard animation timing properties.
 * 
 * Properties:
 * - duration: Animation duration in milliseconds
 * - delay: Delay before animation starts in milliseconds
 * - easing: CSS easing function
 * - fill: How animation behaves after completion (optional)
 */
export interface WebAnimationTiming {
    duration: number;
    delay: number;
    easing: string;
    fill?: "forwards" | "both";
}

/* Runtime Interfaces */

/**
 * Enhanced HTMLElement with motion-specific runtime properties.
 * Extends HTMLElement with additional properties added at runtime for tracking
 * animation state and managing Web Animations API instances.
 * 
 * Properties:
 * - _motionState: Current animation state in the lifecycle
 * - _animations: Active Animation instances from Web Animations API, keyed by type
 * - _observers: IntersectionObserver instances for tracking element visibility
 * 
 * @internal Properties prefixed with underscore indicate private runtime state
 */
export interface MotionElement extends HTMLElement {
    _motionState?: MotionState;
    _animations?: Record<string, Animation>;
    _observers?: IntersectionObserver[];
} 