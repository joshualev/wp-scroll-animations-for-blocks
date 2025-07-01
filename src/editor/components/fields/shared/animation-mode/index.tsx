/**
 * Animation Mode Field
 * ====================
 * 
 * Shared field for switching between entrance and scroll animation modes.
 */

import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface AnimationModeProps {
    checked: boolean;
    onChange: (enabled: boolean) => void;
}

export function AnimationMode({ checked, onChange }: AnimationModeProps) {
    return (
        <ToggleControl 
            label={__("Scroll-based Animation", "motion-blocks")} 
            checked={checked} 
            onChange={onChange}
            help={__("Animate with scroll position instead of entrance only.", "motion-blocks")}
            __nextHasNoMarginBottom
        />
    );
} 