/**
 * Base Animation Class
 * Provides common functionality for all animation types
 */
export class BaseAnimation {
	constructor(settings) {
		this.settings = {
			delay: 0,
			duration: 600,
			easing: "ease-out",
			startThreshold: 0.1,
			endThreshold: 0.9,
			playOnce: false,
			...settings
		};

		this.name = "base";
		this.supportedProperties = ["opacity", "transform"];
	}

	/**
	 * Calculate animation progress based on intersection ratio
	 * @param {number} ratio - Intersection ratio (0-1)
	 * @param {boolean} isVisible - Whether element is currently visible
	 * @param {boolean} hasAnimated - Whether element has been animated before
	 * @returns {number} Progress value (0-1)
	 */
	calculateProgress(ratio, isVisible, hasAnimated) {
		// If element is not visible, don't animate
		if (!isVisible) {
			return 0;
		}

		let progress = 0;

		// Calculate progress based on intersection ratio and thresholds
		if (ratio >= this.settings.startThreshold) {
			if (ratio >= this.settings.endThreshold) {
				progress = 1;
			} else {
				const range = this.settings.endThreshold - this.settings.startThreshold;
				progress = (ratio - this.settings.startThreshold) / range;
			}
		}

		return Math.min(1, Math.max(0, progress));
	}

	/**
	 * Get initial styles for the animation (before it starts)
	 * @returns {Object} CSS styles object
	 */
	getInitialStyles() {
		return {
			opacity: 0,
			transform: "none"
		};
	}

	/**
	 * Get animated styles based on progress
	 * @param {number} progress - Animation progress (0-1)
	 * @returns {Object} CSS styles object
	 */
	getAnimatedStyles(progress) {
		return {
			opacity: progress,
			transform: "none"
		};
	}

	/**
	 * Get transition CSS string
	 * @returns {string} CSS transition string
	 */
	getTransition() {
		const properties = this.supportedProperties.join(", ");
		return `${properties} ${this.settings.duration}ms ${this.settings.easing} ${this.settings.delay}ms`;
	}

	/**
	 * Apply styles to element
	 * @param {HTMLElement} element - Target element
	 * @param {number} progress - Animation progress (0-1)
	 * @param {boolean} immediate - Whether to apply without transition
	 */
	applyStyles(element, progress, immediate = false) {
		const styles =
			progress > 0 ? this.getAnimatedStyles(progress) : this.getInitialStyles();

		Object.assign(element.style, {
			...styles,
			transition: immediate ? "none" : this.getTransition(),
			willChange: this.supportedProperties.join(", ")
		});
	}

	/**
	 * Validate settings
	 * @returns {boolean} Whether settings are valid
	 */
	validateSettings() {
		const { startThreshold, endThreshold, duration, delay } = this.settings;

		return (
			startThreshold >= 0 &&
			startThreshold <= 1 &&
			endThreshold >= 0 &&
			endThreshold <= 1 &&
			startThreshold <= endThreshold &&
			duration > 0 &&
			delay >= 0
		);
	}
}
