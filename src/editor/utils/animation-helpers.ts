/**
 * Animation Helper Utilities
 * ==========================
 * 
 * Pure functions for handling animation logic and transformations.
 * Single responsibility utilities extracted from main editor.
 */

import { ENTRANCE_ANIMATION_PRESETS, SCROLL_ANIMATION_PRESETS, EntranceAnimationType, ScrollAnimationType } from "@/shared/types";
import { VARIANT_LABELS } from "../config/animation-data";

/**
 * Parse animation name into style and variant parts
 */
export const parseAnimation = (animation: string | 'none') => {
    if (animation === 'none' || !animation) {
        return { style: null, variant: null };
    }
    
    // Handle entrance animations (e.g., "fade-in-down" -> style: "fade", variant: "down")
    if (animation.includes('-in-')) {
        const [style, , ...variantParts] = animation.split('-');
        return { 
            style, 
            variant: variantParts.length > 0 ? variantParts.join('-') : 'default' 
        };
    }
    
    // Handle scroll animations (e.g., "fade-enter-leave" -> style: "fade", variant: "enter-leave")
    const parts = animation.split('-');
    const style = parts[0];
    const variant = parts.length > 1 ? parts.slice(1).join('-') : 'default';
    
    return { style, variant };
};

/**
 * Get available directions for entrance animation style
 */
export const getEntranceDirections = (style: string): string[] => {
    return ENTRANCE_ANIMATION_PRESETS
        .filter(anim => anim.startsWith(`${style}-in-`))
        .map(anim => anim.split('-in-')[1]);
};

/**
 * Get available variants for scroll animation style  
 */
export const getScrollVariants = (style: string): string[] => {
    const animations = SCROLL_ANIMATION_PRESETS.filter(anim => anim.startsWith(style));
    
    return animations.map(anim => {
        // Handle animations with '-in-' pattern (e.g., 'fade-in-up' -> 'up')
        if (anim.includes('-in-')) {
            const parts = anim.split('-in-');
            const variant = parts[1];
            return variant && variant.length > 0 ? variant : 'default';
        }
        
        // Handle animations ending with '-in' (e.g., 'scale-in' -> 'default')
        if (anim.endsWith('-in')) {
            return 'default';
        }
        
        // Handle other patterns (e.g., 'fade-enter-leave' -> 'enter-leave')
        const variant = anim.substring(style.length + 1);
        return variant || 'default';
    });
};

/**
 * Format variant key into readable label
 */
export const formatVariantLabel = (key: string): string => {
    return VARIANT_LABELS[key] || key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Build new animation name from style and variant
 */
export const buildEntranceAnimation = (style: string, variant: string): EntranceAnimationType => {
    const directions = getEntranceDirections(style);
    const direction = directions.includes(variant) ? variant : directions[0];
    return (direction ? `${style}-in-${direction}` : `${style}-in`) as EntranceAnimationType;
};

/**
 * Build new scroll animation name from style and variant
 */
export const buildScrollAnimation = (style: string, variant: string): ScrollAnimationType => {
    // Rebuild the animation name based on style and variant
    let newAnimation: string;

    if (variant === 'default') {
        // Handles 'scale-in', 'rotate-in'
        newAnimation = `${style}-in`;
    } else if (variant.includes('enter-leave')) {
        // Handles 'fade-enter-leave', etc.
        newAnimation = `${style}-${variant}`;
    } else {
        // Handles 'fade-in-up', 'slide-in-left', etc.
        newAnimation = `${style}-in-${variant}`;
    }

    // Ensure the generated animation name is a valid one before returning
    if (SCROLL_ANIMATION_PRESETS.includes(newAnimation as ScrollAnimationType)) {
        return newAnimation as ScrollAnimationType;
    }

    // Fallback: if the built animation is invalid, find the first valid one for that style
    const firstMatchingAnimation = SCROLL_ANIMATION_PRESETS.find(p => p.startsWith(style));
    return (firstMatchingAnimation || ScrollAnimationType.FADE_IN_UP) as ScrollAnimationType;
}; 