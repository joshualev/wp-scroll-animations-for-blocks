/**
 * Animation Selection Hook
 * ========================
 * 
 * Handles selecting animation types and directions.
 * Single responsibility: manage user selections of animations.
 */

import { useCallback } from "@wordpress/element";
import type { EntranceAnimationType } from "@/core/animations/entrance";
import type { ScrollAnimationType } from "@/core/animations/scroll";
import type { MotionContext } from "@/core/types";
import { 
    getFirstEntranceAnimationDirection,
    getFirstScrollAnimationDirection
} from "../adapters/core-data-bridge";

interface UseAnimationSelectionProps {
    isScrollMode: boolean;
    setAttributes: (attrs: Partial<MotionContext>) => void;
}

export function useAnimationSelection({ isScrollMode, setAttributes }: UseAnimationSelectionProps) {
    // Select animation type (e.g., "fade", "bounce")
    const selectAnimationType = useCallback((animationType: string) => {
        const firstDirection = isScrollMode 
            ? getFirstScrollAnimationDirection(animationType)
            : getFirstEntranceAnimationDirection(animationType);

        if (firstDirection) {
            if (isScrollMode) {
                setAttributes({ scrollAnimationType: firstDirection as ScrollAnimationType });
            } else {
                setAttributes({ entranceAnimationType: firstDirection as EntranceAnimationType });
            }
        }
    }, [isScrollMode, setAttributes]);

    // Select animation direction (e.g., "fade-up", "bounce-in")
    const selectAnimationDirection = useCallback((direction: string) => {
        if (isScrollMode) {
            setAttributes({ scrollAnimationType: direction as any });
        } else {
            setAttributes({ entranceAnimationType: direction as any });
        }
    }, [isScrollMode, setAttributes]);

    return {
        selectAnimationType,
        selectAnimationDirection
    };
} 