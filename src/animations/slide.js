/**
 * Slide Animation
 * Elements slide from specified direction
 */
import { BaseAnimation } from "./base-animation.js";

export class SlideAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "slide";
		this.supportedProperties = ["opacity", "transform"];
		this.direction = settings.direction || "up";
		this.distance = settings.distance || 50; // pixels
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
		const distance = this.distance * (1 - progress);

		switch (this.direction) {
			case "up":
				return `translateY(${distance}px)`;
			case "down":
				return `translateY(${-distance}px)`;
			case "left":
				return `translateX(${distance}px)`;
			case "right":
				return `translateX(${-distance}px)`;
			default:
				return "none";
		}
	}

	/**
	 * Validate direction setting
	 * @returns {boolean} Whether direction is valid
	 */
	validateSettings() {
		const validDirections = ["up", "down", "left", "right"];
		return super.validateSettings() && validDirections.includes(this.direction);
	}
}

// Export individual slide direction classes for convenience
export class SlideUpAnimation extends SlideAnimation {
	constructor(settings) {
		super({ ...settings, direction: "up" });
		this.name = "slide-up";
	}
}

export class SlideDownAnimation extends SlideAnimation {
	constructor(settings) {
		super({ ...settings, direction: "down" });
		this.name = "slide-down";
	}
}

export class SlideLeftAnimation extends SlideAnimation {
	constructor(settings) {
		super({ ...settings, direction: "left" });
		this.name = "slide-left";
	}
}

export class SlideRightAnimation extends SlideAnimation {
	constructor(settings) {
		super({ ...settings, direction: "right" });
		this.name = "slide-right";
	}
}
