/**
 * Rotate Animation
 * Elements rotate during animation
 */
import { BaseAnimation } from "./base-animation.js";

export class RotateAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "rotate";
		this.supportedProperties = ["opacity", "transform"];
		this.degrees = settings.degrees || 180; // Default rotation degrees
		this.direction = settings.direction || "clockwise"; // clockwise or counterclockwise
	}

	getInitialStyles() {
		const transform = this.getTransformForProgress(0);
		return {
			opacity: 0,
			transform
		};
	}

	getAnimatedStyles(progress) {
		const transform = this.getTransformForProgress(progress);
		return {
			opacity: progress,
			transform
		};
	}

	/**
	 * Get transform string for given progress
	 * @param {number} progress - Animation progress (0-1)
	 * @returns {string} Transform CSS string
	 */
	getTransformForProgress(progress) {
		// Calculate rotation: start at full rotation, end at 0
		const rotation = this.degrees * (1 - progress);
		const finalRotation =
			this.direction === "counterclockwise" ? -rotation : rotation;

		return `rotate(${finalRotation}deg)`;
	}

	/**
	 * Validate settings
	 * @returns {boolean} Whether settings are valid
	 */
	validateSettings() {
		const validDirections = ["clockwise", "counterclockwise"];
		return (
			super.validateSettings() &&
			validDirections.includes(this.direction) &&
			typeof this.degrees === "number" &&
			this.degrees >= 0 &&
			this.degrees <= 720
		); // Max 2 full rotations
	}
}
