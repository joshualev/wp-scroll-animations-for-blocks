// Visibility / geometry helpers
// ------------------------------
/**
 * Determine if an element is *mostly* within the viewport.
 * @param el The element to test
 * @param threshold How much of the element must be visible (0-1), default 0.95
 */
export const isElementFullyVisible = (
    el: HTMLElement,
    threshold = 0.95
): boolean => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;

    return visibleArea / totalArea >= threshold;
}; 