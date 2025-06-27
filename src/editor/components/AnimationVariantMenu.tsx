/**
 * Animation Variant Menu
 * ======================
 * 
 * Specialized menu component for selecting animation variants.
 * Uses the PrimitiveMenu component with animation-specific logic.
 */

import { __ } from "@wordpress/i18n";
import { PrimitiveMenu } from "./primitives/PrimitiveMenu";
import { formatVariantLabel } from "../utils/animation-helpers";

interface VariantOption {
    label: string;
    value: string;
}

interface AnimationVariantMenuProps {
    value: string;
    variants: string[];
    onChange: (value: string) => void;
}

export const AnimationVariantMenu = ({ value, variants, onChange }: AnimationVariantMenuProps) => {
    const options = variants.map(variant => ({
        label: formatVariantLabel(variant),
        value: variant
    }));

    return (
        <PrimitiveMenu
            label={__("Direction / Variant", "motion-blocks")}
            value={value}
            options={options}
            onChange={onChange}
            placeholder={__("Select variant...", "motion-blocks")}
            className="animation-variant-menu"
        />
    );
}; 