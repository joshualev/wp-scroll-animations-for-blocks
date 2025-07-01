/**
 * Animation Direction Field
 * =========================
 * 
 * Shared field for selecting animation direction (Up, Down, Left, Right, etc.).
 */

import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";
import { formatAnimationDirectionLabel } from "../../../../utils/ui-transforms";

interface AnimationDirectionProps {
    value: string;
    variants: string[];
    onChange: (value: string) => void;
}

export function AnimationDirection({ value, variants, onChange }: AnimationDirectionProps) {
    const options = variants.map(variant => ({
        label: formatAnimationDirectionLabel(variant),
        value: variant
    }));

    return (
        <SelectControl
            label={__("Animation Direction", "motion-blocks")}
            value={value}
            options={options}
            onChange={onChange}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
        />
    );
} 