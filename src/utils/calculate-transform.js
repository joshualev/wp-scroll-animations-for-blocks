import {
	ANIMATION_DIRECTIONS,
	ANIMATION_DISTANCE,
	ANIMATION_SCALE,
	ANIMATION_TYPES
} from "../constants";

/**
 * Calculate the transform value based on animation type and direction
 * @param {boolean} inView - Whether element is in view
 * @param {string} type - Animation type
 * @param {string} direction - Animation direction (for slide)
 * @returns {string} CSS transform value
 */
export function calculateTransform(inView, type, direction) {
	if (inView) {
		return "translate(0, 0) scale(1)";
	}

	let translateX = "0";
	let translateY = "0";
	let scale = "1";

	switch (type) {
		case ANIMATION_TYPES.SLIDE:
			switch (direction) {
				case ANIMATION_DIRECTIONS.UP:
					translateY = `-${ANIMATION_DISTANCE}`;
					break;
				case ANIMATION_DIRECTIONS.DOWN:
					translateY = ANIMATION_DISTANCE;
					break;
				case ANIMATION_DIRECTIONS.LEFT:
					translateX = `-${ANIMATION_DISTANCE}`;
					break;
				case ANIMATION_DIRECTIONS.RIGHT:
					translateX = ANIMATION_DISTANCE;
					break;
				case ANIMATION_DIRECTIONS.CENTER:
					scale = ANIMATION_SCALE.SLIDE_CENTER;
					break;
			}
			break;
		case ANIMATION_TYPES.SPRING:
			scale = ANIMATION_SCALE.SPRING;
			break;
		case ANIMATION_TYPES.FADE:
		default:
			// Fade only changes opacity
			break;
	}

	return `translate(${translateX}, ${translateY}) scale(${scale})`;
}
