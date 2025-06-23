/**
 * Create and configure an intersection observer for scroll animations
 * @param {Function} callback - Callback function to execute on intersection
 * @param {number} threshold - Intersection threshold (0-1)
 * @returns {IntersectionObserver} Configured observer instance
 */
export function createScrollObserver(callback, threshold = 0.5) {
	return new IntersectionObserver(callback, {
		threshold
	});
}
