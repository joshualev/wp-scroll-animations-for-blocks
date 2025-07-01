/**
 * Core Engine: Public Types
 * 
 * Type definitions that form the public API of the core animation engine.
 * These are consumed by integration layers (e.g., frontend, editor).
 */

import { type EntranceAnimationType } from "@/core/animations/entrance";
import { type ScrollAnimationType } from "@/core/animations/scroll";

/**
 * Block configuration passed from the environment (e.g., data-wp-context).
 * This is the primary contract for the motion engine.
 */
export interface MotionContext {
    motionEnabled: boolean;
    entranceAnimationType?: EntranceAnimationType;
    scrollAnimationType?: ScrollAnimationType;
    motionDuration: number;
    motionDelay: number;
    motionTimingFunction?: string;
    motionThreshold?: number;
    scrollAnimationEnabled: boolean;
    scrollCompletionPoint?: number;
    scrollCompletionPointMobile?: number;
}

export interface WebAnimationTiming {
    duration: number;
    delay: number;
    easing: string;
    fill?: FillMode;
}