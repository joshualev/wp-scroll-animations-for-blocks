/**
 * Core Engine: Public Types
 * 
 * Type definitions that form the public API of the core animation engine.
 * These are consumed by integration layers (e.g., frontend, editor).
 */

import { AnimationType } from "@/core/animations/keyframes";

/**
 * Block configuration passed from the environment (e.g., data-wp-context).
 * This is the primary contract for the motion engine.
 */
export interface MotionContext {
    mb_motionEnabled: boolean;
    mb_scrollAnimationEnabled: boolean;
    mb_animationType: AnimationType;
    mb_duration: number;
    mb_delay: number;
    mb_speedCurve: string;
    mb_threshold: number;
    mb_scrollCompletionPoint: number;
}

export interface WebAnimationTiming {
    duration: number;
    delay: number;
    easing: string;
    fill?: FillMode;
}