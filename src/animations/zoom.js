/**
 * Zoom Animation
 * Elements scale up or down
 */
import { BaseAnimation } from "./base-animation.js";

export class ZoomAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "zoom";
		this.supportedProperties = ["opacity", "transform"];
		this.direction = settings.direction || "in";
		this.scale = settings.scale || 0.8; // Initial scale for zoom-in, final scale for zoom-out
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
		let scale;

		if (this.direction === "in") {
			// Zoom in: start small, end at normal size
			scale = this.scale + progress * (1 - this.scale);
		} else {
			// Zoom out: start large, end at normal size
			scale = 1 + this.scale - progress * this.scale;
		}

		return `scale(${scale})`;
	}

	/**
	 * Validate direction setting
	 * @returns {boolean} Whether direction is valid
	 */
	validateSettings() {
		const validDirections = ["in", "out"];
		return (
			super.validateSettings() &&
			validDirections.includes(this.direction) &&
			this.scale > 0 &&
			this.scale < 2
		);
	}
}

// Export individual zoom direction classes for convenience
export class ZoomInAnimation extends ZoomAnimation {
	constructor(settings) {
		super({ ...settings, direction: "in" });
		this.name = "zoom-in";
	}
}

export class ZoomOutAnimation extends ZoomAnimation {
	constructor(settings) {
		super({ ...settings, direction: "out" });
		this.name = "zoom-out";
	}
}
