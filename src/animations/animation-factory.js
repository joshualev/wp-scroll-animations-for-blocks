/**
 * Animation Factory
 * Creates and manages animation instances
 */
import { BlurAnimation } from "./blur.js";
import { FadeAnimation } from "./fade.js";
import { FlipXAnimation, FlipYAnimation } from "./flip.js";
import { RotateAnimation } from "./rotate.js";
import {
	SlideDownAnimation,
	SlideLeftAnimation,
	SlideRightAnimation,
	SlideUpAnimation
} from "./slide.js";
import { ZoomInAnimation, ZoomOutAnimation } from "./zoom.js";

export class AnimationFactory {
	constructor() {
		this.animationClasses = new Map([
			["fade", FadeAnimation],
			["slide-up", SlideUpAnimation],
			["slide-down", SlideDownAnimation],
			["slide-left", SlideLeftAnimation],
			["slide-right", SlideRightAnimation],
			["zoom-in", ZoomInAnimation],
			["zoom-out", ZoomOutAnimation],
			["rotate", RotateAnimation],
			["flip-x", FlipXAnimation],
			["flip-y", FlipYAnimation],
			["blur", BlurAnimation]
		]);
	}

	/**
	 * Create animation instance
	 * @param {string} type - Animation type
	 * @param {Object} settings - Animation settings
	 * @returns {BaseAnimation|null} Animation instance or null if invalid
	 */
	create(type, settings = {}) {
		const AnimationClass = this.animationClasses.get(type);

		if (!AnimationClass) {
			console.warn(`Unknown animation type: ${type}`);
			return null;
		}

		try {
			const animation = new AnimationClass(settings);

			if (!animation.validateSettings()) {
				console.warn(`Invalid settings for animation type: ${type}`, settings);
				return null;
			}

			return animation;
		} catch (error) {
			console.error(`Error creating animation ${type}:`, error);
			return null;
		}
	}

	/**
	 * Get available animation types
	 * @returns {Array<string>} Array of available animation type names
	 */
	getAvailableTypes() {
		return Array.from(this.animationClasses.keys());
	}

	/**
	 * Check if animation type is supported
	 * @param {string} type - Animation type to check
	 * @returns {boolean} Whether the type is supported
	 */
	isSupported(type) {
		return this.animationClasses.has(type);
	}
}

// Export singleton instance
export const animationFactory = new AnimationFactory();
