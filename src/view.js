/**
 * Motion Blocks Frontend Script
 * Handles scroll-triggered animations for blocks with motion attributes.
 */
import { animationFactory } from "./animations/animation-factory.js";

class MotionBlocks {
	constructor() {
		this.observers = new Map();
		this.elements = new Map();
		this.isInitialized = false;

		// Bind methods
		this.init = this.init.bind(this);
		this.handleIntersection = this.handleIntersection.bind(this);
		this.createObserver = this.createObserver.bind(this);
		this.initializeElement = this.initializeElement.bind(this);
		this.animateElement = this.animateElement.bind(this);
	}

	init() {
		if (this.isInitialized) {
			return;
		}

		// Find all elements with motion enabled
		const motionElements = document.querySelectorAll(
			'[data-motion-enabled="true"]'
		);

		if (motionElements.length === 0) {
			return;
		}

		// Initialize each element
		motionElements.forEach((element) => {
			this.initializeElement(element);
		});

		this.isInitialized = true;
	}

	initializeElement(element) {
		// Get motion settings from data attributes
		const settings = {
			preset: element.dataset.motionPreset || "fade",
			delay: parseInt(element.dataset.motionDelay) || 0,
			duration: parseInt(element.dataset.motionDuration) || 600,
			easing: element.dataset.motionEasing || "ease-out",
			startThreshold: parseFloat(element.dataset.motionStartThreshold) || 0.1,
			endThreshold: parseFloat(element.dataset.motionEndThreshold) || 0.9,
			playOnce: element.dataset.motionPlayOnce === "true"
		};

		// Create animation instance
		const animation = animationFactory.create(settings.preset, settings);

		if (!animation) {
			console.warn("Failed to create animation for element:", element);
			return;
		}

		// Store element data
		this.elements.set(element, {
			animation,
			settings,
			hasAnimated: false,
			isVisible: false,
			lastProgress: 0
		});

		// Set initial state
		animation.applyStyles(element, 0, true);

		// Create intersection observer for this element
		this.createObserver(element);
	}

	createObserver(element) {
		// Create observer with fine-grained thresholds for smooth animations
		const thresholds = [];
		for (let i = 0; i <= 100; i++) {
			thresholds.push(i / 100);
		}

		const observer = new IntersectionObserver(
			(entries) => this.handleIntersection(entries, element),
			{
				threshold: thresholds,
				rootMargin: "0px"
			}
		);

		observer.observe(element);
		this.observers.set(element, observer);
	}

	handleIntersection(entries, element) {
		const entry = entries[0];
		const elementData = this.elements.get(element);

		if (!elementData) {
			return;
		}

		const { animation, settings } = elementData;
		const ratio = entry.intersectionRatio;

		// Check if element is in view based on thresholds
		const isInView = ratio >= settings.startThreshold;

		// Update visibility state
		elementData.isVisible = isInView;

		// Handle play once logic: if animation has completed and playOnce is enabled, disconnect observer
		if (
			settings.playOnce &&
			elementData.hasAnimated &&
			elementData.lastProgress >= 1
		) {
			this.disconnectElement(element);
			return;
		}

		// Animate based on intersection ratio
		this.animateElement(element, ratio, elementData);
	}

	animateElement(element, ratio, elementData) {
		const { animation, settings } = elementData;

		// Calculate animation progress
		const progress = animation.calculateProgress(
			ratio,
			elementData.isVisible,
			elementData.hasAnimated
		);

		// Only update if progress has changed significantly (performance optimization)
		const progressDiff = Math.abs(progress - elementData.lastProgress);
		if (
			progressDiff < 0.01 &&
			elementData.lastProgress !== 0 &&
			progress !== 1
		) {
			return;
		}

		// Mark as animated if progress > 0
		if (progress > 0) {
			elementData.hasAnimated = true;
		}

		// Apply animation styles
		animation.applyStyles(element, progress);

		// Store last progress for comparison
		elementData.lastProgress = progress;
	}

	/**
	 * Refresh all animations (useful for dynamic content)
	 */
	refresh() {
		this.destroy();
		this.init();
	}

	/**
	 * Add motion to a specific element
	 * @param {HTMLElement} element - Element to add motion to
	 */
	addElement(element) {
		if (
			element.dataset.motionEnabled === "true" &&
			!this.elements.has(element)
		) {
			this.initializeElement(element);
		}
	}

	/**
	 * Disconnect observer for a specific element (used for play once)
	 * @param {HTMLElement} element - Element to disconnect observer for
	 */
	disconnectElement(element) {
		const observer = this.observers.get(element);
		if (observer) {
			observer.disconnect();
			this.observers.delete(element);
		}
		// Note: We keep the element data for potential future use
	}

	/**
	 * Remove motion from a specific element
	 * @param {HTMLElement} element - Element to remove motion from
	 */
	removeElement(element) {
		const observer = this.observers.get(element);
		if (observer) {
			observer.disconnect();
			this.observers.delete(element);
		}

		this.elements.delete(element);
	}

	destroy() {
		// Clean up observers
		this.observers.forEach((observer) => {
			observer.disconnect();
		});

		this.observers.clear();
		this.elements.clear();
		this.isInitialized = false;
	}
}

// Initialize when DOM is ready
const motionBlocks = new MotionBlocks();

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", motionBlocks.init);
} else {
	motionBlocks.init();
}

// Re-initialize on navigation (for SPA-like behavior)
window.addEventListener("load", motionBlocks.init);

// Export for potential external use
window.MotionBlocks = motionBlocks;
