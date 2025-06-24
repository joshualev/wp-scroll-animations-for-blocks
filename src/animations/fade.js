/**
 * Fade Animation
 * Simple opacity transition
 */
import { BaseAnimation } from "./base-animation.js";

export class FadeAnimation extends BaseAnimation {
	constructor(settings) {
		super(settings);
		this.name = "fade";
		this.supportedProperties = ["opacity"];
	}

	getInitialStyles() {
		return {
			opacity: 0,
			transform: "none"
		};
	}

	getAnimatedStyles(progress) {
		return {
			opacity: progress,
			transform: "none"
		};
	}
}
