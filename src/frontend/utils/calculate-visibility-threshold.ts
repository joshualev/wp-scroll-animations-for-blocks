/**
 * Calculates visibility threshold from scroll range percentage.
 * Ensures threshold is within valid bounds (0.1-1.0).
 * 
 * @param scrollRange - Scroll range percentage (0-100)
 * @returns Clamped threshold value (0.1-1.0)
 */
export function calculateVisibilityThreshold(scrollRange: number): number {
    const threshold = scrollRange / 100;
    return Math.max(0.1, Math.min(1, threshold));
} 