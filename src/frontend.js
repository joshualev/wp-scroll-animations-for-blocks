import { getContext, getElement, store } from "@wordpress/interactivity";

import {
	calculateTransform,
	calculateTransition,
	createScrollObserver
} from "./utils";

/**
 * Register the scroll animations store
 */
store("scroll-animations", {
	state: {
		get opacity() {
			const context = getContext();
			return context.inView ? 1 : 0;
		},

		get transform() {
			const context = getContext();
			const { inView, type, direction } = context;

			return calculateTransform(inView, type, direction);
		},

		get transition() {
			const context = getContext();
			const { duration, delay, type } = context;

			return calculateTransition(duration, delay, type);
		}
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();

			if (!ref) return;

			// Set CSS custom properties for dynamic timing
			ref.style.setProperty("--animation-duration", `${context.duration}ms`);
			ref.style.setProperty("--animation-delay", `${context.delay}ms`);

			// Set timing function based on animation type
			const timingFunction =
				context.type === "spring"
					? "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
					: "ease-out";
			ref.style.setProperty("--animation-timing", timingFunction);

			// Create observer with direct intersection handling
			const observer = createScrollObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Element is visible - trigger animation
						context.inView = true;

						// Only unobserve if not repeating
						if (!context.repeat) {
							observer.unobserve(ref);
						}
					} else if (context.repeat) {
						// Element is not visible and repeating is enabled - reset animation
						context.inView = false;
					}
				});
			}, context.threshold);

			observer.observe(ref);

			// Cleanup function
			return () => observer.disconnect();
		}
	}
});
