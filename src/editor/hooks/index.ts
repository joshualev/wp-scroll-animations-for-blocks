/**
 * Animation Editor Hooks
 * ======================
 * 
 * Focused, composable hooks for animation editor state management.
 * Each hook has a single responsibility for better maintainability.
 */

// Main orchestrator hook (composed from smaller hooks)
export { useAnimationEditor } from "./use-animation-editor";

// Focused hooks (used internally but available for advanced use cases)
export { useAnimationState } from "./use-animation-state";
export { useAnimationOptions } from "./use-animation-options";
export { useAnimationToggle } from "./use-animation-toggle";
export { useAnimationSelection } from "./use-animation-selection";
export { useAnimationSettings } from "./use-animation-settings";

// Motion preview hook (uses your core system in editor!)
export { useMotionPreview } from "./use-motion-preview";

// New hook for global animation preview
export { useGlobalAnimationPreview } from './use-global-animation-preview'; 
