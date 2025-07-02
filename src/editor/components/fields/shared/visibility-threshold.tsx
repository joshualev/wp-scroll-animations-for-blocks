/**
 * Visibility Threshold Field
 * ===========================
 * 
 * Shared field for setting animation trigger threshold.
 */

import { RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface VisibilityThresholdProps {
    value: number;
    onChange: (value: number) => void;
}

export function VisibilityThreshold({ value, onChange }: VisibilityThresholdProps) {
    return (
        <RangeControl 
            label={__("Threshold", "motion-blocks")} 
            value={value} 
            onChange={(newValue) => onChange(newValue ?? 20)} 
            min={0} 
            max={100} 
            step={5}
            help={__("Percentage of element visibility required to trigger animation.", "motion-blocks")}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
        />
    );
} 