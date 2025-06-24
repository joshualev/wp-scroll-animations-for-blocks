/**
 * Motion Blocks Frontend Script
 * WordPress Interactivity API with IntersectionObserver
 */
import { getContext, getElement, store } from "@wordpress/interactivity";
import "./style.scss";

/**
 * WordPress dependencies
		// Global state

/*"
 * Test if Interactivity API is working
 */
console.log("Motion Blocks: Testing Interactivity API");
console.log("store function:", store);

/**
 * A simple feature detection for CSS `animation-timeline: view()`.
 */
const supportsViewTimeline = () =>
	window.CSS &&
	window.CSS.supports &&
	window.CSS.supports("animation-timeline", "view()");

store("motion-blocks", {
	state: {
		test: "Motion Blocks loaded successfully!"
	},
	actions: {
		/**
		 * Check if element is fully visible in viewport with buffer
		 */
		isElementFullyVisible() {
			const { ref } = getElement();
			console.log("ref:", ref);
			if (!ref) return false;

			const rect = ref.getBoundingClientRect();
			const windowHeight =
				window.innerHeight || document.documentElement.clientHeight;
			const windowWidth =
				window.innerWidth || document.documentElement.clientWidth;

			// Element must be completely within viewport with buffer
			const buffer = 50;
			return (
				rect.top >= buffer &&
				rect.left >= buffer &&
				rect.bottom <= windowHeight - buffer &&
				rect.right <= windowWidth - buffer
			);
		},

		/**
		 * Play entrance animation for elements visible on page load
		 */
		playEntranceAnimation() {
			const { ref } = getElement();
			const context = getContext();

			if (!ref) return;

			const { preset, duration, delay, timingFunction, scrollEnabled } =
				context;

			// Set CSS custom properties for entrance animation
			ref.style.setProperty("--motion-duration", `${duration}ms`);
			ref.style.setProperty("--motion-delay", `${delay}ms`);
			ref.style.setProperty("--motion-timing-function", timingFunction);

			// Apply entrance animation class
			ref.setAttribute("data-motion-entrance", "true");
			context.isEntranceActive = true;
			context.hasPlayedEntrance = false;

			// If scroll is enabled, transition after entrance completes
			if (scrollEnabled) {
				const handleAnimationEnd = (event) => {
					if (
						event.target === ref &&
						event.animationName.includes("entrance")
					) {
						ref.removeEventListener("animationend", handleAnimationEnd);
						context.hasPlayedEntrance = true;

						// Transition to scroll mode
						ref.removeAttribute("data-motion-entrance");
						context.isEntranceActive = false;

						// Clear entrance-specific properties
						ref.style.removeProperty("--motion-delay");

						// Setup scroll animation
						store("motion-blocks").actions.setupScrollAnimation();
					}
				};

				ref.addEventListener("animationend", handleAnimationEnd);
			}
		},

		/**
		 * Set up scroll animation with IntersectionObserver
		 */
		setupScrollAnimation() {
			const { ref } = getElement();
			const context = getContext();

			if (!ref || context.isScrollActive) return;

			const { duration, scrollRange } = context;

			// Set CSS properties for scroll animation
			ref.style.setProperty("--motion-duration", `${duration}ms`);
			ref.setAttribute("data-motion-scroll", "true");
			context.isScrollActive = true;

			// Calculate threshold from scroll range percentage
			const threshold = Math.max(
				0.1,
				Math.min(1.0, parseFloat(scrollRange) / 100)
			);

			// Create IntersectionObserver
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						context.isVisible = entry.isIntersecting;
					});
				},
				{
					threshold: threshold,
					rootMargin: "0px 0px -10% 0px"
				}
			);

			observer.observe(ref);

			// Store observer reference for cleanup
			ref._motionObserver = observer;
		},

		test() {
			console.log("Motion Blocks: Action called successfully!");
		}
	},
	callbacks: {
		/**
		 * Initializes the motion effect for a block using IntersectionObserver.
		 * This provides precise control over when animations are triggered.
		 */
		initMotion() {
			const { ref } = getElement();
			const context = getContext();

			// Exit if animation is disabled or no preset is selected.
			if (!context.motionEnabled || context.motionPreset === "none") {
				return;
			}

			const observer = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							// Element is in view, add class to trigger animation.
							ref.classList.add("is-visible");

							// If scroll animation is NOT enabled, this is a one-time effect.
							// We can unobserve the element for performance.
							if (!context.motionScrollEnabled) {
								obs.unobserve(ref);
							}
						} else {
							// Element is out of view. If scroll animation is enabled,
							// remove the class so it can re-animate on next entry.
							if (context.motionScrollEnabled) {
								ref.classList.remove("is-visible");
							}
						}
					});
				},
				{
					// Use the scroll range from settings to set the threshold.
					// The value from the editor is a percentage (e.g., 30),
					// so we divide by 100 to get a value between 0.0 and 1.0.
					threshold: (context.motionScrollRange || 10) / 100
				}
			);

			observer.observe(ref);
		}
	}
});
