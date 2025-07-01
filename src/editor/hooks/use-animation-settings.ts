/**
 * Animation Settings Hook
 * =======================
 * 
 * Handles generic animation settings updates.
 * Single responsibility: update any motion setting property.
 */

import { useCallback } from "@wordpress/element";
import type { MotionContext } from "@/core/types";

interface UseAnimationSettingsProps {
    setAttributes: (attrs: Partial<MotionContext>) => void;
}

export function useAnimationSettings({ setAttributes }: UseAnimationSettingsProps) {
    // Update any setting
    const updateSetting = useCallback((settingKey: keyof MotionContext, settingValue: any) => {
        setAttributes({ [settingKey]: settingValue });
    }, [setAttributes]);

    return {
        updateSetting
    };
} 