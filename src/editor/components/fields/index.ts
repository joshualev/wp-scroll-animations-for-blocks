/**
 * Animation Fields
 * ================
 * 
 * Logically organized field components for animation controls.
 * Organized into shared, entrance-only, and scroll-only settings.
 */

// Shared Settings (used by both entrance and scroll modes)
export { 
    MotionToggle, 
    AnimationMode, 
    VisibilityThreshold, 
    AnimationType, 
    AnimationDirection 
} from "./shared";

// Entrance-Only Settings
export { 
    AnimationDuration, 
    AnimationDelay, 
    AnimationTimingFunction 
} from "./entrance";

// Scroll-Only Settings
export { 
    ScrollCompletionPoint 
} from "./scroll"; 