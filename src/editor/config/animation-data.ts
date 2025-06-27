/**
 * Animation Configuration Data
 * ============================
 * 
 * Static configurations for Motion Blocks editor UI.
 * Extracted from main editor to improve readability.
 */

export const ENTRANCE_STYLES = [
    { name: 'fade', label: 'Fade', icon: 'image-filter' },
    { name: 'slide', label: 'Slide', icon: 'slides' },
    { name: 'bounce', label: 'Bounce', icon: 'arrow-down-alt' },
    { name: 'zoom', label: 'Zoom', icon: 'search' },
    { name: 'flip', label: 'Flip', icon: 'admin-page' },
    { name: 'roll', label: 'Roll', icon: 'update' },
] as const;

export const SCROLL_STYLES = [
    { name: 'fade', label: 'Fade', icon: 'image-filter' },
    { name: 'slide', label: 'Slide', icon: 'slides' },
    { name: 'scale', label: 'Scale', icon: 'editor-expand' },
    { name: 'rotate', label: 'Rotate', icon: 'image-rotate' },
] as const;

export const TIMING_FUNCTIONS = [
    { label: "Ease Out", value: "ease-out" },
    { label: "Ease", value: "ease" },
    { label: "Ease In", value: "ease-in" },
    { label: "Ease In Out", value: "ease-in-out" },
    { label: "Linear", value: "linear" }
];

export const DEFAULT_TIMING_FUNCTION = "ease-out";

export const VARIANT_LABELS: Record<string, string> = {
    'in': 'In',
    'x': 'Horizontal', 
    'y': 'Vertical',
    'default': 'Default'
}; 