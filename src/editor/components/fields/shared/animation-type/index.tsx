/**
 * Animation Type Field
 * ====================
 * 
 * Shared field for selecting animation type (Fade, Bounce, Slide, etc.).
 */

import { Button } from "@wordpress/components";
import { __experimentalGrid as Grid } from '@wordpress/components';
import type { AnimationTypeOption } from "../../../../utils/ui-transforms";

interface AnimationTypeProps {
    animationTypes: AnimationTypeOption[];
    selectedAnimationType: string | undefined;
    onSelect: (animationType: string) => void;
}

export function AnimationType({ animationTypes, selectedAnimationType, onSelect }: AnimationTypeProps) {
    return (
        <Grid columns={3} gap={2}>
            {animationTypes.map((animationType) => (
                <Button
                    key={animationType.name}
                    variant={selectedAnimationType === animationType.name ? "primary" : "secondary"}
                    onClick={() => onSelect(animationType.name)}
                    className="motion-style-button"
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}
                >
                    {animationType.label}
                </Button>
            ))}
        </Grid>
    );
} 