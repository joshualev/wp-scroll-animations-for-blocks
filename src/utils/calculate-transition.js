import { ANIMATION_TYPES } from "../constants";

/**
 * Calculate the transition value
 * @param {number} duration - Animation duration in ms
 * @param {number} delay - Animation delay in ms
 * @param {string} type - Animation type
 * @returns {string} CSS transition value
 */
export function calculateTransition(duration, delay, type) {
	const timingFunction =
		type === ANIMATION_TYPES.SPRING
			? "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
			: "ease-out";

	return `opacity ${duration}ms ${timingFunction} ${delay}ms, transform ${duration}ms ${timingFunction} ${delay}ms`;
}
