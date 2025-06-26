/**
 * Motion Blocks Type System
 * 
 * Complete type definitions for the Motion Blocks WordPress plugin.
 */

// ============================================================================
// CORE ENUMS
// ============================================================================

/**
 * Available animation types supported by the plugin.
 * Each type corresponds to CSS keyframe definitions.
 */
export enum AnimationType {
    FADE_IN = "fade-in",
    SLIDE_IN_UP = "slide-in-up", 
    SLIDE_IN_DOWN = "slide-in-down",
    SLIDE_IN_LEFT = "slide-in-left",
    SLIDE_IN_RIGHT = "slide-in-right",
    SCALE_IN = "scale-in",
    BLUR_IN = "blur-in"
}

/**
 * Animation lifecycle states for tracking element progression.
 */
export enum MotionState {
    /** Element initialized but no animations started */
    IDLE = "idle",
    /** Entry animation currently playing */
    ENTRY_PLAYING = "entry_playing", 
    /** Entry animation finished */
    ENTRY_COMPLETE = "entry_complete",
    /** Ready to start scroll-driven animation */
    SCROLL_READY = "scroll_ready",
    /** Scroll-driven animation active */
    SCROLL_ACTIVE = "scroll_active"
}

// ============================================================================
// CONSTANTS & BASIC TYPES
// ============================================================================

/**
 * Array of all available animation types for iteration.
 */
export const ANIMATION_PRESETS = Object.values(AnimationType);

/**
 * String literal type for animation type values.
 */
export type AnimationTypeValue = `${AnimationType}`;

// ============================================================================
// CONFIGURATION INTERFACES
// ============================================================================

/**
 * Block configuration passed from PHP to frontend via data-wp-context.
 * Contains all user-configured animation settings from the editor.
 */
export interface MotionContext {
    /** Whether motion animations are enabled for this block */
    motionEnabled: boolean;
    /** Animation type to use, or "none" to disable */
    motionType: AnimationTypeValue | "none";
    /** Animation duration in milliseconds */
    motionDuration: number;
    /** Delay before animation starts in milliseconds */
    motionDelay: number;
    /** CSS easing function name */
    motionTimingFunction: string;
    /** Whether scroll-based animation is enabled */
    motionScrollEnabled: boolean;
    /** Scroll threshold percentage (0-100) */
    motionScrollRange: number;
}

/**
 * Web Animations API timing configuration.
 * Subset of the native KeyframeAnimationOptions interface.
 */
export interface WebAnimationTiming {
    /** Animation duration in milliseconds */
    duration: number;
    /** Delay before animation starts in milliseconds */
    delay: number;
    /** CSS easing function */
    easing: string;
    /** How animation behaves after completion */
    fill?: "forwards" | "both";
}

/**
 * Complete motion configuration combining timing and viewport settings.
 * Used internally after resolving user preferences to concrete values.
 */
export interface MotionOptions extends WebAnimationTiming {
    /**
     * Viewport visibility threshold (0-1).
     * - 0: element just touches viewport edge
     * - 1: element completely inside viewport  
     * - 0.5: 50% of element visible
     */
    threshold: number;
}

// ============================================================================
// RUNTIME INTERFACES
// ============================================================================

/**
 * Enhanced HTMLElement with motion-specific runtime properties.
 * 
 * This interface extends HTMLElement with additional properties added at runtime
 * for tracking animation state and managing Web Animations API instances.
 * 
 * The `_animations` Record stores native browser Animation instances (from the Web Animations API).
 * Animation is a built-in browser interface that represents a single animation player
 * and provides methods to control playback (play, pause, cancel, etc.).
 * 
 * @internal This interface is for internal use only. Properties prefixed with 
 * underscore indicate private runtime state.
 */
export interface MotionElement extends HTMLElement {
    /** Current animation state in the lifecycle */
    _motionState?: MotionState;
    /** 
     * Active Animation instances from the Web Animations API, keyed by animation type.
     * Animation is a built-in browser interface for controlling individual animations.
     */
    _animations?: Record<string, Animation>;
    /** IntersectionObserver instances for tracking element visibility */
    _observers?: IntersectionObserver[];
} 