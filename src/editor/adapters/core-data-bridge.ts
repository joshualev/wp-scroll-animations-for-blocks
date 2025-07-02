/**
 * Core Data Bridge
 * ================
 * 
 * Pure data bridge for core animation data.
 * Provides consistent interface between editor and core animation systems.
 * No UI logic - just data access and transformation.
 */

import { 
    ENTRANCE_ANIMATION_GROUPS, 
    type EntranceAnimationType 
} from "@/core/animations/entrance";

import { 
    SCROLL_ANIMATION_GROUPS, 
    type ScrollAnimationType 
} from "@/core/animations/scroll";

// ========================
// Animation Type Getters
// ========================

/**
 * Get all available entrance animation type names
 */
export function getEntranceAnimationTypes(): string[] {
    return Object.keys(ENTRANCE_ANIMATION_GROUPS);
}

/**
 * Get all available scroll animation type names
 */
export function getScrollAnimationTypes(): string[] {
    return Object.keys(SCROLL_ANIMATION_GROUPS);
}

// ========================
// Animation Direction Getters
// ========================

/**
 * Get all animation directions for a specific entrance animation type
 */
export function getEntranceAnimationDirections(animationType: string): EntranceAnimationType[] {
    const directions = ENTRANCE_ANIMATION_GROUPS[animationType as keyof typeof ENTRANCE_ANIMATION_GROUPS];
    return directions ? [...directions] : [];
}

/**
 * Get all animation directions for a specific scroll animation type
 */
export function getScrollAnimationDirections(animationType: string): ScrollAnimationType[] {
    const directions = SCROLL_ANIMATION_GROUPS[animationType as keyof typeof SCROLL_ANIMATION_GROUPS];
    return directions ? [...directions] : [];
}

// ========================
// Default Direction Selectors
// ========================

/**
 * Get the first (default) entrance animation direction for a type
 */
export function getDefaultEntranceAnimationDirection(animationType: string): EntranceAnimationType {
    const directions = getEntranceAnimationDirections(animationType);
    return directions[0];
}

/**
 * Get the first (default) scroll animation direction for a type
 */
export function getDefaultScrollAnimationDirection(animationType: string): ScrollAnimationType {
    const directions = getScrollAnimationDirections(animationType);
    return directions[0];
}

// ========================
// Animation Type Resolvers
// ========================

/**
 * Find which animation type contains a specific animation direction
 * Useful for reverse lookups when you have an animation name
 */
export function resolveAnimationType(animation: string): string | undefined {
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

// ========================
// Validation Helpers
// ========================

/**
 * Check if an animation type exists in entrance animations
 */
export function isValidEntranceAnimationType(animationType: string): boolean {
    return animationType in ENTRANCE_ANIMATION_GROUPS;
}

/**
 * Check if an animation type exists in scroll animations
 */
export function isValidScrollAnimationType(animationType: string): boolean {
    return animationType in SCROLL_ANIMATION_GROUPS;
} 