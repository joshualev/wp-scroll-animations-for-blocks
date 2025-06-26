/**
 * Accessibility Utilities
 * =======================
 * Functions for respecting user accessibility preferences.
 */

/**
 * Detects if the user has requested reduced motion via system preferences.
 * 
 * @returns `true` if user prefers reduced motion, `false` otherwise
 * 
 * @remarks
 * Checks the CSS media query `(prefers-reduced-motion: reduce)` which
 * corresponds to OS-level accessibility settings for motion sensitivity.
 */
export const prefersReducedMotion = (): boolean =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false; 
