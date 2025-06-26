/**
 * Element Visibility Utilities
 *
 * Provides functions to determine the visibility status of an element
 * relative to the browser's viewport.
 */

/**
 * The visibility state of an element.
 * - `isInViewport`: True if any part of the element is visible.
 * - `isFullyVisible`: True if the entire element is contained within the viewport.
 * - `isPartiallyVisible`: True if the element is in the viewport but not fully visible.
 * - `meetsThreshold`: True if element visibility meets the specified threshold.
 */
export interface ElementVisibility {
	isInViewport: boolean;
	isFullyVisible: boolean;
	isPartiallyVisible: boolean;
	meetsThreshold: boolean;
	visibilityRatio: number;
}

/**
 * Determines the visibility state of an element within the viewport.
 *
 * @param element The HTML element to check.
 * @param threshold Visibility threshold (0-1), defaults to 0.3 (30%)
 * @returns An object describing the element's visibility state.
 */
export function getElementVisibility(element: HTMLElement, threshold: number = 0.3): ElementVisibility {
	const rect = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;

	const isInViewport =
		rect.top < viewportHeight &&
		rect.bottom > 0 &&
		rect.left < viewportWidth &&
		rect.right > 0;

	const isFullyVisible =
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= viewportHeight &&
		rect.right <= viewportWidth;

	// Calculate how much of the element is visible in the viewport
	const visibleTop = Math.max(0, rect.top);
	const visibleBottom = Math.min(viewportHeight, rect.bottom);
	const visibleHeight = Math.max(0, visibleBottom - visibleTop);
	const elementHeight = rect.height;
	const visibilityRatio = elementHeight > 0 ? visibleHeight / elementHeight : 0;
	
	// Check if visibility meets the threshold
	const meetsThreshold = visibilityRatio >= threshold;

	return {
		isInViewport,
		isFullyVisible,
		isPartiallyVisible: isInViewport && !isFullyVisible,
		meetsThreshold,
		visibilityRatio,
	};
} 