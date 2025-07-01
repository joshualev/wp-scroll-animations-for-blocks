/**
 * Animation Toggle Hook
 * =====================
 * 
 * Handles enabling/disabling animations and mode switching.
 * Single responsibility: manage animation on/off and entrance vs scroll modes.
 */

import { useCallback } from "@wordpress/element";
import type { MotionContext } from "@/core/types";
import { 
    getEntranceAnimationTypes,
    getScrollAnimationTypes,
    getFirstEntranceAnimationDirection,
    getFirstScrollAnimationDirection
} from "../adapters/core-data-bridge";

interface UseAnimationToggleProps {
    setAttributes: (attrs: Partial<MotionContext>) => void;
}

export function useAnimationToggle({ setAttributes }: UseAnimationToggleProps) {
    // Toggle animation on/off
    const toggleMotion = useCallback((enabled: boolean) => {
        if (enabled) {
            // Enable with first available entrance animation
            const firstType = getEntranceAnimationTypes()[0];
            const firstDirection = getFirstEntranceAnimationDirection(firstType);
            
            setAttributes({
                motionEnabled: true,
                scrollAnimationEnabled: false,
                entranceAnimationType: firstDirection,
                scrollAnimationType: undefined
            });
        } else {
            // Disable all animations
            setAttributes({
                motionEnabled: false,
                scrollAnimationEnabled: false,
                entranceAnimationType: undefined,
                scrollAnimationType: undefined
            });
        }
    }, [setAttributes]);

    // Toggle between entrance and scroll modes
    const toggleAnimationMode = useCallback((useScrollMode: boolean) => {
        if (useScrollMode) {
            // Switch to first available scroll animation
            const firstType = getScrollAnimationTypes()[0];
            const firstDirection = getFirstScrollAnimationDirection(firstType);
            
            setAttributes({
                scrollAnimationEnabled: true,
                entranceAnimationType: undefined,
                scrollAnimationType: firstDirection
            });
        } else {
            // Switch to first available entrance animation
            const firstType = getEntranceAnimationTypes()[0];
            const firstDirection = getFirstEntranceAnimationDirection(firstType);
            
            setAttributes({
                scrollAnimationEnabled: false,
                entranceAnimationType: firstDirection,
                scrollAnimationType: undefined
            });
        }
    }, [setAttributes]);

    return {
        toggleMotion,
        toggleAnimationMode
    };
} 