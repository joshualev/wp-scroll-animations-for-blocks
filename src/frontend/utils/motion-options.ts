/**
 * Motion Options Creation
 * 
 * Converts motion context from WordPress into resolved animation configuration.
 */

import { MotionContext, MotionOptions } from "@/shared/types";

/**
 * Creates resolved motion options from WordPress block context.
 * Handles defaults, validation, and type conversion.
 * 
 * @param motionContext - Motion configuration from block attributes
 * @returns Resolved motion options ready for animation APIs
 */
export function createMotionOptions(motionContext: MotionContext): MotionOptions {
    return {
        duration: motionContext.motionDuration || 600,
        delay: motionContext.motionDelay || 0,
        easing: motionContext.motionTimingFunction || "ease-out",
        fill: "forwards",
        threshold: calculateVisibilityThreshold(motionContext.motionScrollRange || 30)
    };
}

/**
 * Calculates visibility threshold from scroll range percentage.
 * Ensures threshold is within valid bounds (0.1-1.0).
 * 
 * @param scrollRange - Scroll range percentage (0-100)
 * @returns Clamped threshold value (0.1-1.0)
 */
function calculateVisibilityThreshold(scrollRange: number): number {
    const threshold = scrollRange / 100;
    return Math.max(0.1, Math.min(1, threshold));
} 