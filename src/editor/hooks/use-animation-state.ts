/**
 * Animation State Hook
 * ====================
 * 
 * Manages current animation state and parsing.
 * Single responsibility: track what animation is currently active.
 */

import { useMemo } from "@wordpress/element";
import type { MotionContext } from "@/core/types";
import { 
    resolveAnimationType,
    getEntranceAnimationDirections,
    getScrollAnimationDirections
} from "../adapters/core-data-bridge";
import { parseAnimationState, type AnimationState } from "../utils/ui-transforms";

interface UseAnimationStateProps {
    attributes: MotionContext;
}

export function useAnimationState({ attributes }: UseAnimationStateProps) {
    const {
        motionEnabled = false,
        scrollAnimationEnabled = false,
        entranceAnimationType,
        scrollAnimationType
    } = attributes;

    // Get current animation and type
    const currentAnimation = scrollAnimationEnabled ? scrollAnimationType : entranceAnimationType;
    const currentAnimationType = currentAnimation ? resolveAnimationType(currentAnimation) : undefined;
    
    // Get available directions for current type - worth memoizing
    const availableAnimationDirections = useMemo(() => {
        if (!currentAnimationType) return [];
        
        return scrollAnimationEnabled 
            ? getScrollAnimationDirections(currentAnimationType)
            : getEntranceAnimationDirections(currentAnimationType);
    }, [currentAnimationType, scrollAnimationEnabled]);

    // Parse state for UI consumption - worth memoizing (object creation)
    const animationState = useMemo((): AnimationState => {
        return parseAnimationState(currentAnimation, currentAnimationType, availableAnimationDirections);
    }, [currentAnimation, currentAnimationType, availableAnimationDirections]);

    return {
        isEnabled: motionEnabled,
        isScrollMode: scrollAnimationEnabled,
        currentAnimation,
        currentAnimationType,
        animationState
    };
} 