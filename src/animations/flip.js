/**
 * Flip Animation
 * 3D flip animation on X or Y axis
 */
import { BaseAnimation } from "./base-animation.js";

export class FlipAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "flip";
		this.supportedProperties = ["opacity", "transform"];
		this.axis = settings.axis || "x"; // 'x' or 'y'
		this.degrees = settings.degrees || 90; // Flip degrees
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
		// Calculate flip: start at full flip, end at 0
		const rotation = this.degrees * (1 - progress);

		if (this.axis === "x") {
			return `perspective(1000px) rotateX(${rotation}deg)`;
		} else {
			return `perspective(1000px) rotateY(${rotation}deg)`;
		}
	}

	/**
	 * Validate settings
	 * @returns {boolean} Whether settings are valid
	 */
	validateSettings() {
		const validAxes = ["x", "y"];
		return (
			super.validateSettings() &&
			validAxes.includes(this.axis) &&
			typeof this.degrees === "number" &&
			this.degrees >= 0 &&
			this.degrees <= 180
		);
	}
}

// Export individual flip axis classes for convenience
export class FlipXAnimation extends FlipAnimation {
	constructor(settings) {
		super({ ...settings, axis: "x" });
		this.name = "flip-x";
	}
}

export class FlipYAnimation extends FlipAnimation {
	constructor(settings) {
		super({ ...settings, axis: "y" });
		this.name = "flip-y";
	}
}
