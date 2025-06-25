/**
 * Motion Blocks Type Definitions
 * ==============================
 * 
 * This file contains all type definitions for the Motion Blocks plugin.
 * It provides a centralized location for:
 * - Animation presets and states
 * - Configuration interfaces
 * - Runtime element tracking
 * - Web Animations API wrappers
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/**
 * Available animation preset names.
 * These correspond to CSS animation keyframes and are used throughout the plugin.
 */
export enum AnimationPreset {
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
 * Array of all available animation presets for iteration.
 * Automatically derived from the AnimationPreset enum.
 */
export const ANIMATION_PRESETS = Object.values(AnimationPreset);

// ============================================================================
// UNION TYPES
// ============================================================================

/**
 * Valid animation preset values (string literals).
 * These are the actual string values stored in block attributes.
 */
export type AnimationPresetValue = `${AnimationPreset}`;

/**
 * Animation state values (string literals).
 */
export type AnimationStateValue = `${AnimationState}`;

// ============================================================================
// TYPE GUARDS & UTILITIES
// ============================================================================

/**
 * Type guard to check if a string is a valid animation preset.
 * 
 * @param value - String to check
 * @returns True if value is a valid animation preset
 */
export function isAnimationPreset(value: string): value is AnimationPresetValue {
    return Object.values(AnimationPreset).includes(value as AnimationPreset);
}

/**
 * Safely converts a string to an AnimationPreset enum value.
 * 
 * @param value - String value from block attributes
 * @returns AnimationPreset enum value or null if invalid
 */
export function toAnimationPreset(value: string): AnimationPreset | null {
    if (isAnimationPreset(value)) {
        return value as AnimationPreset;
    }
    return null;
}

/**
 * Converts an AnimationPreset enum to its string value.
 * 
 * @param preset - AnimationPreset enum value
 * @returns String value
 */
export function fromAnimationPreset(preset: AnimationPreset): AnimationPresetValue {
    return preset as AnimationPresetValue;
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
    /** Which animation preset to use, or "none" to disable */
    motionPreset: AnimationPresetValue | "none";
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

// ============================================================================
// EDITOR INTERFACES  
// ============================================================================



/**
 * Dropdown option for animation preset selection.
 */
export interface PresetOption {
    /** Display label for the option */
    label: string;
    /** Value to store in block attributes */
    value: AnimationPresetValue | "none";
}

/**
 * Dropdown option for timing function selection.
 */
export interface TimingFunctionOption {
    /** Display label for the option */
    label: string;
    /** CSS timing function value */
    value: string;
} 