/**
 * Motion Blocks Type Definitions
 * ==============================
 * 
 * This file contains all type definitions for the Motion Blocks plugin.
 * It provides a centralized location for:
 * - Animation types and states
 * - Configuration interfaces
 * - Runtime element tracking
 * - Web Animations API wrappers
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/**
 * Available animation type names.
 * These correspond to CSS animation keyframes and are used throughout the plugin.
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
 * Used internally to manage animation state machine.
 */
export enum AnimationState {
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

/**
 * Array of all available animation types for iteration.
 * Automatically derived from the AnimationType enum.
 */
export const ANIMATION_PRESETS = Object.values(AnimationType);

// ============================================================================
// UNION TYPES
// ============================================================================

/**
 * Valid animation type values (string literals).
 * These are the actual string values stored in block attributes.
 */
export type AnimationTypeValue = `${AnimationType}`;


// ============================================================================
// TYPE GUARDS & UTILITIES
// ============================================================================

/**
 * Type guard to check if a string is a valid animation type.
 * 
 * @param value - String to check
 * @returns True if value is a valid animation type
 */
export function isAnimationType(value: string): value is AnimationTypeValue {
    return Object.values(AnimationType).includes(value as AnimationType);
}

/**
 * Safely converts a string to an AnimationType enum value.
 * 
 * @param value - String value from block attributes
 * @returns AnimationType enum value or null if invalid
 */
export function toAnimationType(value: string): AnimationType | null {
    if (isAnimationType(value)) {
        return value as AnimationType;
    }
    return null;
}

// ============================================================================
// CONFIGURATION INTERFACES
// ============================================================================

/**
 * Block configuration passed from PHP to frontend via `data-wp-context`.
 * Contains all user-configured animation settings from the editor.
 */
export interface MotionContext {
    /** Whether motion animations are enabled for this block */
    motionEnabled: boolean;
    /** Which animation type to use, or "none" to disable */
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
 * Subset of the official KeyframeAnimationOptions interface.
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
     * 
     * - `0` = element just touches viewport edge
     * - `1` = element completely inside viewport
     * - `0.5` = 50% of element visible
     */
    threshold: number;
}

// ============================================================================
// RUNTIME INTERFACES
// ============================================================================

/**
 * Enhanced HTMLElement with motion-specific runtime properties.
 * Used for state tracking during animation lifecycle.
 * 
 * @internal This interface is for internal use only
 */
export interface MotionElement extends HTMLElement {
    /** Current animation state in the lifecycle */
    _motionState?: AnimationState;
    /** Active Web Animation instances keyed by type */
    _animations?: Record<string, Animation>;
    /** Active IntersectionObserver instances */
    _observers?: IntersectionObserver[];
}
