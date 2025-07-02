/**
 * Animation Fields
 * ================
 * 
 * Logically organized field components for animation controls.
 * Organized into shared, entrance-only, and scroll-only settings.
 */

// Shared Settings (used by both entrance and scroll modes)
export { AnimationMode } from "./shared/animation-mode";

export { MotionToggle } from "./shared/motion-toggle";

export { VisibilityThreshold } from "./shared/visibility-threshold";
export { AnimationType } from "./shared/animation-type";
export { AnimationDirection } from "./shared/animation-direction";

// Entrance-Only Settings
export { AnimationDuration } from "./entrance/duration";
export { AnimationDelay } from "./entrance/delay";
export { AnimationTimingFunction } from "./entrance/timing-function";

// Scroll-Only Settings
export { ScrollCompletionPoint } from "./scroll/completion-point"; 







