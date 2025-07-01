/**
 * UI Transforms
 * =============
 * 
 * Transforms core animation data into UI-ready formats.
 * Minimal, readable functions for editor UI.
 */

import type { EntranceAnimationType } from "@/core/animations/entrance";
import type { ScrollAnimationType } from "@/core/animations/scroll";

/**
 * UI option for animation type selection
 */
export interface AnimationTypeOption {
    name: string;
    label: string;
}

/**
 * Animation state for editor UI
 */
export interface AnimationState {
    currentAnimationType: string | undefined;
    currentAnimationDirection: string | undefined;
    availableAnimationDirections: string[];
}

/**
 * Transform animation type names into UI options with labels
 */
export function createAnimationTypeOptions(animationTypes: string[]): AnimationTypeOption[] {
    return animationTypes.map(type => ({
        name: type,
        label: capitalize(type)
    }));
}

/**
 * Parse animation into UI state
 */
export function parseAnimationState(
    animation: EntranceAnimationType | ScrollAnimationType | undefined,
    animationType: string | undefined,
    directions: string[]
): AnimationState {
    if (!animationType || !animation) {
        return {
            currentAnimationType: undefined,
            currentAnimationDirection: undefined,
            availableAnimationDirections: []
        };
    }

    return {
        currentAnimationType: animationType,
        currentAnimationDirection: animation,
        availableAnimationDirections: directions
    };
}

/**
 * Format animation direction names for display
 */
export function formatAnimationDirectionLabel(direction: string): string {
    return direction
        .split('-')
        .map(word => capitalize(word))
        .join(' ');
}

/**
 * Capitalize first letter
 */
function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
} 