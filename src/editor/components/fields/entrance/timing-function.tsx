/**
 * Animation Timing Function Field
 * ================================
 * 
 * Entrance-only field for selecting animation timing function.
 */

import { SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const TIMING_OPTIONS = [
    { label: "Ease Out", value: "ease-out" },
    { label: "Ease", value: "ease" },
    { label: "Ease In", value: "ease-in" },
    { label: "Ease In Out", value: "ease-in-out" },
    { label: "Linear", value: "linear" }
];

interface AnimationTimingFunctionProps {
    value: string;
    onChange: (value: string) => void;
}

export function AnimationTimingFunction({ value, onChange }: AnimationTimingFunctionProps) {
    return (
        <SelectControl 
            label={__("Speed Curve", "motion-blocks")} 
            value={value} 
            options={TIMING_OPTIONS} 
            onChange={onChange}
            help={__("How the animation accelerates and decelerates.", "motion-blocks")}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
        />
    );
} 