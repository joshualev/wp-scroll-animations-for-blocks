/**
 * Style Selector Component
 * ========================
 * 
 * Grid-based selector for animation styles using native WordPress components.
 */

import { Button, Dashicon } from "@wordpress/components";
// @ts-ignore - Experimental component
import { __experimentalGrid as Grid } from '@wordpress/components';
import type { IconKey } from "@wordpress/components/src/dashicon/types";

interface Style {
    name: string;
    label: string;
    icon: string;
}

interface StyleSelectorProps {
    styles: readonly Style[];
    selectedStyle: string | null;
    onSelect: (style: string) => void;
}

export const StyleSelector = ({ styles, selectedStyle, onSelect }: StyleSelectorProps) => {
    return (
        <Grid columns={4} gap={2}>
            {styles.map((style) => (
                <Button
                    key={style.name}
                    variant="primary"
                    isPressed={selectedStyle === style.name}
                    onClick={() => onSelect(style.name)}
                    style={{ 
                        flexDirection: 'column', 
                        height: 'auto', 
                        padding: '8px 4px', 
                        gap: '4px' 
                    }}
                >
                    <Dashicon icon={style.icon as IconKey} />
                    <span style={{ fontSize: '11px' }}>{style.label}</span>
                </Button>
            ))}
        </Grid>
    );
}; 