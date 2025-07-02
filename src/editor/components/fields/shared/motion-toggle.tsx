/**
 * Motion Toggle Field
 * ===================
 * 
 * Shared field for enabling/disabling motion animations.
 */

import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface MotionToggleProps {
    checked: boolean;
    onChange: (enabled: boolean) => void;
}

export function MotionToggle({ checked, onChange }: MotionToggleProps) {
    return (
        <ToggleControl 
            label={__("Enable Animation", "motion-blocks")} 
            checked={checked} 
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    );
} 