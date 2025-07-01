/**
 * Core Data Bridge
 * ================
 * 
 * Pure data bridge for core animation data.
 * No UI logic - just data access.
 */

import { 
    ENTRANCE_ANIMATION_GROUPS, 
    type EntranceAnimationType 
} from "@/core/animations/entrance";

import { 
    SCROLL_ANIMATION_GROUPS, 
    type ScrollAnimationType 
} from "@/core/animations/scroll";

/**
 * Get entrance animation types from core
 */
export function getEntranceAnimationTypes(): string[] {
    return Object.keys(ENTRANCE_ANIMATION_GROUPS);
}

/**
 * Get scroll animation types from core
 */
export function getScrollAnimationTypes(): string[] {
    return Object.keys(SCROLL_ANIMATION_GROUPS);
}

/**
 * Get entrance animation directions for a type
 */
export function getEntranceAnimationDirections(animationType: string): EntranceAnimationType[] {
    const directions = ENTRANCE_ANIMATION_GROUPS[animationType as keyof typeof ENTRANCE_ANIMATION_GROUPS];
    return directions ? [...directions] : [];
}

/**
 * Get scroll animation directions for a type
 */
export function getScrollAnimationDirections(animationType: string): ScrollAnimationType[] {
    const directions = SCROLL_ANIMATION_GROUPS[animationType as keyof typeof SCROLL_ANIMATION_GROUPS];
    return directions ? [...directions] : [];
}

/**
 * Get first entrance animation for a type
 */
export function getFirstEntranceAnimationDirection(animationType: string): EntranceAnimationType | undefined {
    const directions = getEntranceAnimationDirections(animationType);
    return directions[0];
}

/**
 * Get first scroll animation for a type
 */
export function getFirstScrollAnimationDirection(animationType: string): ScrollAnimationType | undefined {
    const directions = getScrollAnimationDirections(animationType);
    return directions[0];
}

/**
 * Find which animation type contains a specific animation
 */
export function findAnimationType(animation: string): string | undefined {
    // Check entrance animations
    for (const [animationType, animations] of Object.entries(ENTRANCE_ANIMATION_GROUPS)) {
        if ((animations as readonly string[]).includes(animation)) {
            return animationType;
        }
    }
    
    // Check scroll animations
    for (const [animationType, animations] of Object.entries(SCROLL_ANIMATION_GROUPS)) {
        if ((animations as readonly string[]).includes(animation)) {
            return animationType;
        }
    }
    
    return undefined;
} 