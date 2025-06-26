/**
 * Detects ViewTimeline API support for scroll-driven animations.
 * @returns `true` if browser supports CSS scroll-driven animations
 */
export const supportsViewTimeline = (): boolean => {
    // Check for CSS.supports if available
    if (typeof CSS !== 'undefined' && CSS.supports) {
        const supports = CSS.supports('animation-timeline', 'view()');
        console.log(`Motion Blocks: CSS.supports('animation-timeline', 'view()') = ${supports}`);
        return supports;
    }
    return false;
};