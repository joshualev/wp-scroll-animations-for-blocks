/**
 * Animation Duration Field
 * ========================
 * 
 * Entrance-only field for setting animation duration.
 */

import { RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface AnimationDurationProps {
    value: number;
    onChange: (value: number) => void;
}

export function AnimationDuration({ value, onChange }: AnimationDurationProps) {
    return (
        <RangeControl 
            label={__("Duration", "motion-blocks")} 
            value={value} 
            onChange={(newValue) => onChange(newValue ?? 1000)} 
            min={100} 
            max={3000} 
            step={100}
            help={__("How long the animation takes to complete.", "motion-blocks")}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
        />
    );
} 