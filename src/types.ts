/**
 * Shared Motion Blocks types
 * --------------------------------------------------
 * Central place for runtime context interfaces and
 * state enums. Keeping these in one file avoids drift
 * and helps the test-suite import just what it needs.
 */

// Built-in animation preset names kept central here so every
// module can import from a single source of truth.
export const ANIMATION_PRESETS = [
    "fade-in",
    "slide-in-up",
    "slide-in-down",
    "slide-in-left",
    "slide-in-right",
    "scale-in",
    "blur-in"
] as const;

export type AnimationPreset = typeof ANIMATION_PRESETS[number];

/**
 * Internal lifecycle states an element progresses through. Used only by view.ts.
 */
export enum AnimationState {
    IDLE = "idle",
    ENTRY_PLAYING = "entry_playing",
    ENTRY_COMPLETE = "entry_complete",
    SCROLL_READY = "scroll_ready",
    SCROLL_ACTIVE = "scroll_active"
}

/**
 * Block attributes that the frontend script cares about, passed verbatim from PHP via data-wp-context.
 */
export interface MotionContext {
    motionEnabled: boolean;
    motionPreset: AnimationPreset | "none";
    motionDuration: number;
    motionDelay: number;
    motionTimingFunction: string;
    motionScrollEnabled: boolean;
    motionScrollRange: number; // Percentage 0–100
}

export interface MotionElement extends HTMLElement {
    _motionState?: AnimationState;
    _animations?: Record<string, Animation>;
    _hasBeenOutOfView?: boolean;
    _observers?: IntersectionObserver[];
    _outOfViewObserver?: IntersectionObserver;
}

/**
 * Direct subset of the Web Animations timing dictionary that we actually use
 * when calling `element.animate()`.
 */
export interface WebAnimationTiming {
    /** Total run-time in milliseconds. */
    duration: number;
    /** Delay before start in milliseconds. */
    delay: number;
    /** CSS easing function (e.g. 'ease', 'linear'). */
    easing: string;
    /** Fill behaviour after finishing – we only ever use 'forwards' or 'both'. */
    fill?: 'forwards' | 'both';
}

/**
 * Runtime options resolved from the block attributes.
 * These are the exact numbers used when creating animations.
 */
export interface MotionOptions extends WebAnimationTiming {
    /**
     * Fraction of the element that must be inside the viewport before we
     * consider it "visible" (0 = just touches viewport, 1 = fully visible).
     */
    threshold: number;
} 