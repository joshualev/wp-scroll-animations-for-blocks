/**
 * Core Data Bridge
 * ================
 * 
 * Pure data bridge for core animation data.
 * Provides consistent interface between editor and core animation systems.
 * No UI logic - just data access and transformation.
 */

import { 
    ANIMATION_GROUPS, 
    type AnimationType 
} from "@/core/animations/keyframes";


/**
 * Get all animation types
 * @returns An array of animation types
 */
export function getAnimationTypes(): string[] {
    return Object.keys(ANIMATION_GROUPS);
}

/**
 * Get all animation directions for a given animation type
 * @param animationType - The animation type to get directions for
 * @returns An array of animation directions
 */
export function getAnimationDirections(animationType: string): AnimationType[] {
    const directions = ANIMATION_GROUPS[animationType as keyof typeof ANIMATION_GROUPS];
    return directions ? [...directions] : [];
}

/**
 * Get the default animation direction for a given animation type
 * @param animationType - The animation type to get the default direction for
 * @returns The default animation direction
 */
export function getDefaultAnimationDirection(animationType: string): AnimationType {
    const directions = getAnimationDirections(animationType);
    return directions[0];
}

/**
 * Find which animation type contains a specific animation direction
 * Useful for reverse lookups when you have an animation name
 */
export function resolveAnimationType(animation: string): string | undefined {
    // Check animations
    for (const [animationType, animations] of Object.entries(ANIMATION_GROUPS)) {
        if ((animations as readonly string[]).includes(animation)) {
            return animationType;
        }
    }
    
    return undefined;
}