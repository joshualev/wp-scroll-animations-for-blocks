/**
 * Animation Options Hook
 * ======================
 * 
 * Provides available animation types and directions.
 * Single responsibility: supply UI options based on current mode.
 */

import { useMemo } from "@wordpress/element";
import { 
    getEntranceAnimationTypes,
    getScrollAnimationTypes,
    getEntranceAnimationDirections,
    getScrollAnimationDirections
} from "../adapters/core-data-bridge";
import { createAnimationTypeOptions } from "../utils/ui-transforms";

interface UseAnimationOptionsProps {
    isScrollMode: boolean;
    currentAnimationType?: string;
}

export function useAnimationOptions({ isScrollMode, currentAnimationType }: UseAnimationOptionsProps) {
    // Simple function call - no need for useMemo
    const availableAnimationTypes = isScrollMode ? getScrollAnimationTypes() : getEntranceAnimationTypes();

    // Function call with parameters - worth memoizing
    const availableAnimationDirections = useMemo(() => {
        if (!currentAnimationType) return [];
        
        return isScrollMode 
            ? getScrollAnimationDirections(currentAnimationType)
            : getEntranceAnimationDirections(currentAnimationType);
    }, [currentAnimationType, isScrollMode]);

    // Array transformation - worth memoizing
    const animationTypeOptions = useMemo(() => 
        createAnimationTypeOptions(availableAnimationTypes),
        [availableAnimationTypes]
    );

    return {
        animationTypeOptions,
        availableAnimationDirections
    };
}