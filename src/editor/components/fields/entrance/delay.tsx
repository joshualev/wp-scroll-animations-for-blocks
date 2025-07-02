/**
 * Animation Delay Field
 * =====================
 * 
 * Entrance-only field for setting animation delay.
 */

import { RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface AnimationDelayProps {
    value: number;
    onChange: (value: number) => void;
}

export function AnimationDelay({ value, onChange }: AnimationDelayProps) {
    return (
        <RangeControl 
            label={__("Delay", "motion-blocks")} 
            value={value} 
            onChange={(newValue) => onChange(newValue ?? 0)} 
            min={0} 
            max={2000} 
            step={100}
            help={__("Wait time before animation starts.", "motion-blocks")}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
        />
    );
} 