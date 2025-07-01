/**
 * Animation Editor Hook
 * =====================
 * 
 * Main orchestrator for animation editor.
 * Composes smaller, focused hooks for better maintainability.
 */

import type { MotionContext } from "@/core/types";
import { useAnimationState } from "./use-animation-state";
import { useAnimationOptions } from "./use-animation-options";
import { useAnimationToggle } from "./use-animation-toggle";
import { useAnimationSelection } from "./use-animation-selection";
import { useAnimationSettings } from "./use-animation-settings";

interface AnimationEditorProps {
    attributes: MotionContext;
    setAttributes: (attrs: Partial<MotionContext>) => void;
}

export function useAnimationEditor({ attributes, setAttributes }: AnimationEditorProps) {
    // Get current animation state
    const { isEnabled, isScrollMode, animationState } = useAnimationState({ attributes });

    // Get available options
    const { animationTypeOptions } = useAnimationOptions({ 
        isScrollMode, 
        currentAnimationType: animationState.currentAnimationType 
    });

    // Get toggle functions
    const { toggleMotion, toggleAnimationMode } = useAnimationToggle({ setAttributes });

    // Get selection functions
    const { selectAnimationType, selectAnimationDirection } = useAnimationSelection({ 
        isScrollMode, 
        setAttributes 
    });

    // Get settings function
    const { updateSetting } = useAnimationSettings({ setAttributes });

    return {
        isEnabled,
        isScrollMode,
        animationState,
        animationTypeOptions,
        toggleMotion,
        toggleAnimationMode,
        selectAnimationType,
        selectAnimationDirection,
        updateSetting
    };
} 