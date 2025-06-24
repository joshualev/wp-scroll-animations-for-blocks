/**
 * Blur Animation
 * Elements blur in and out of focus
 */
import { BaseAnimation } from "./base-animation.js";

export class BlurAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "blur";
		this.supportedProperties = ["opacity", "filter"];
		this.maxBlur = settings.maxBlur || 10; // Maximum blur in pixels
	}

	getInitialStyles() {
		return {
			opacity: 0,
			filter: `blur(${this.maxBlur}px)`
		};
	}

	getAnimatedStyles(progress) {
		// As progress increases, blur decreases
		const blurAmount = this.maxBlur * (1 - progress);

		return {
			opacity: progress,
			filter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none"
		};
	}

	/**
	 * Get transition CSS string
	 * @returns {string} CSS transition string
	 */
	getTransition() {
		return `opacity ${this.settings.duration}ms ${this.settings.easing} ${this.settings.delay}ms, filter ${this.settings.duration}ms ${this.settings.easing} ${this.settings.delay}ms`;
	}

	/**
	 * Validate settings
	 * @returns {boolean} Whether settings are valid
	 */
	validateSettings() {
		return (
			super.validateSettings() &&
			typeof this.maxBlur === "number" &&
			this.maxBlur >= 0 &&
			this.maxBlur <= 50
		);
	}
}
