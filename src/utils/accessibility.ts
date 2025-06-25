// Accessibility helpers
// ----------------------
/** Detect if the user prefers reduced motion. */
export const prefersReducedMotion = (): boolean =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false; 