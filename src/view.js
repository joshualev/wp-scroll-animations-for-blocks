/**
 * Motion Blocks Frontend Script
 * Using Web Animations API for smooth scroll-driven animations
 */
import { getContext, getElement, store } from "@wordpress/interactivity";
import "./style.scss";

/**
 * Animation presets defined as keyframe objects for Web Animations API
 */
const ANIMATION_KEYFRAMES = {
	"fade-in": [{ opacity: 0 }, { opacity: 1 }],
	"slide-in-up": [
		{ opacity: 0, transform: "translateY(30px)" },
		{ opacity: 1, transform: "translateY(0)" }
	],
	"slide-in-down": [
		{ opacity: 0, transform: "translateY(-30px)" },
		{ opacity: 1, transform: "translateY(0)" }
	],
	"slide-in-left": [
		{ opacity: 0, transform: "translateX(30px)" },
		{ opacity: 1, transform: "translateX(0)" }
	],
	"slide-in-right": [
		{ opacity: 0, transform: "translateX(-30px)" },
		{ opacity: 1, transform: "translateX(0)" }
	],
	"scale-in": [
		{ opacity: 0, transform: "scale(0.9)" },
		{ opacity: 1, transform: "scale(1)" }
	],
	"blur-in": [
		{ opacity: 0, filter: "blur(5px)", transform: "scale(0.98)" },
		{ opacity: 1, filter: "blur(0)", transform: "scale(1)" }
	]
};

/**
 * Check if browser supports ScrollTimeline
 */
const supportsScrollTimeline = () => {
	return typeof ScrollTimeline !== "undefined";
};

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = () => {
	return (
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
};

/**
 * Check if element is fully visible in viewport
 */
function isElementFullyVisible(element, threshold = 0.95) {
	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;

	// Element must be mostly within viewport
	const visibleHeight =
		Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
	const visibleWidth =
		Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
	const visibleArea = visibleHeight * visibleWidth;
	const totalArea = rect.height * rect.width;

	return visibleArea / totalArea >= threshold;
}

/**
 * Calculate scroll progress for an element (0 to 1)
 */
function calculateScrollProgress(element, threshold = 0.1) {
	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight;

	// Calculate margins based on threshold
	const margin = windowHeight * threshold;

	// Element completely above viewport
	if (rect.bottom < margin) return 0;

	// Element completely below viewport
	if (rect.top > windowHeight - margin) return 0;

	// Calculate progress based on element's journey through viewport
	const elementHeight = rect.height;
	const totalDistance = windowHeight + elementHeight - 2 * margin;
	const currentPosition = windowHeight - margin - rect.top;

	// Clamp between 0 and 1
	return Math.max(0, Math.min(1, currentPosition / totalDistance));
}

/**
 * Animation states for elements
 */
const ANIMATION_STATES = {
	IDLE: "idle",
	ENTRY_PLAYING: "entry_playing",
	ENTRY_COMPLETE: "entry_complete",
	SCROLL_READY: "scroll_ready",
	SCROLL_ACTIVE: "scroll_active"
};

store("motion-blocks", {
	state: {
		test: "Motion Blocks with Web Animations API loaded!"
	},
	actions: {
		/**
		 * Create an entrance animation using Web Animations API
		 */
		createEntranceAnimation(element, preset, options = {}) {
			const keyframes = ANIMATION_KEYFRAMES[preset];
			if (!keyframes) return null;

			const animationOptions = {
				duration: options.duration || 600,
				delay: options.delay || 0,
				easing: options.easing || "ease-out",
				fill: "forwards" // Keep final state
			};

			console.log(`Motion Blocks: Creating entry animation for ${preset}`);
			return element.animate(keyframes, animationOptions);
		},

		/**
		 * Create a scroll-driven animation using Web Animations API
		 */
		createScrollAnimation(element, preset, options = {}) {
			const keyframes = ANIMATION_KEYFRAMES[preset];
			if (!keyframes) return null;

			// Use minimal duration for scroll-driven animations
			const animationOptions = {
				duration: 1, // 1ms duration required for scroll-driven animations
				fill: "both",
				easing: "linear"
			};

			const animation = element.animate(keyframes, animationOptions);

			// Try to use modern ViewTimeline API first
			if (typeof ViewTimeline !== "undefined") {
				try {
					const viewTimeline = new ViewTimeline({
						subject: element,
						axis: "block"
					});
					animation.timeline = viewTimeline;

					console.log("Motion Blocks: Using ViewTimeline for scroll animation");
					return animation;
				} catch (e) {
					console.warn("ViewTimeline not fully supported:", e);
				}
			}

			// Fallback: manual scroll control
			animation.pause();
			console.log("Motion Blocks: Using manual scroll control");
			return animation;
		},

		/**
		 * Update animation progress based on scroll position
		 */
		updateScrollAnimationProgress(animation, element, threshold = 0.1) {
			if (!animation || animation.timeline) return; // Skip if using ScrollTimeline

			const progress = calculateScrollProgress(element, threshold);

			// Update animation progress
			if (animation.effect) {
				const duration = animation.effect.getComputedTiming().duration;
				animation.currentTime = progress * duration;
			}
		}
	},
	callbacks: {
		/**
		 * Initialize motion effects using Web Animations API with proper state management
		 */
		initMotion() {
			const { ref } = getElement();
			const context = getContext();

			// Respect accessibility preferences
			if (prefersReducedMotion()) {
				console.log(
					"Motion Blocks: Animations disabled due to user preference"
				);
				if (ref) ref.style.opacity = "1";
				return;
			}

			if (!context.motionEnabled || context.motionPreset === "none" || !ref) {
				if (ref) ref.style.opacity = "1";
				return;
			}

			const options = {
				duration: parseInt(context.motionDuration) || 600,
				delay: parseInt(context.motionDelay) || 0,
				easing: context.motionTimingFunction || "ease-out",
				threshold: (context.motionScrollRange || 30) / 100
			};

			// Initialize element state
			ref._motionState = ANIMATION_STATES.IDLE;
			ref._animations = {};
			ref._hasBeenOutOfView = false;

			console.log(
				`Motion Blocks: Initializing ${context.motionPreset} animation`
			);

			// Check if element is fully visible on page load
			const isFullyVisible = isElementFullyVisible(ref, 0.8);

			if (isFullyVisible) {
				// Element is fully visible - play entry animation immediately
				store("motion-blocks").callbacks.playEntryAnimation(
					ref,
					context,
					options
				);
			} else {
				// Element is not fully visible - set up intersection observer
				store("motion-blocks").callbacks.setupIntersectionObserver(
					ref,
					context,
					options
				);
			}

			// Set up scroll animation if enabled
			if (context.motionScrollEnabled) {
				store("motion-blocks").callbacks.setupScrollAnimation(
					ref,
					context,
					options
				);
			}

			// Setup cleanup
			store("motion-blocks").callbacks.setupCleanup(ref);
		},

		/**
		 * Play entry animation immediately
		 */
		playEntryAnimation(element, context, options) {
			element._motionState = ANIMATION_STATES.ENTRY_PLAYING;

			const entranceAnimation = store(
				"motion-blocks"
			).actions.createEntranceAnimation(element, context.motionPreset, options);

			if (entranceAnimation) {
				element._animations.entrance = entranceAnimation;

				entranceAnimation.addEventListener("finish", () => {
					element._motionState = ANIMATION_STATES.ENTRY_COMPLETE;
					console.log("Motion Blocks: Entry animation completed");

					// If scroll is enabled, set up monitoring for when element goes out of view
					if (context.motionScrollEnabled && !element._scrollSetup) {
						store("motion-blocks").callbacks.monitorForOutOfView(
							element,
							context,
							options
						);
					}
				});

				console.log("Motion Blocks: Playing entry animation");
			}
		},

		/**
		 * Set up intersection observer for elements not initially visible
		 */
		setupIntersectionObserver(element, context, options) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (
							entry.isIntersecting &&
							element._motionState === ANIMATION_STATES.IDLE
						) {
							store("motion-blocks").callbacks.playEntryAnimation(
								element,
								context,
								options
							);
							observer.disconnect();
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "50px"
				}
			);

			observer.observe(element);
			element._observers = element._observers || [];
			element._observers.push(observer);
		},

		/**
		 * Monitor element for going out of view (to enable scroll animation)
		 */
		monitorForOutOfView(element, context, options) {
			if (element._outOfViewObserver) return; // Already monitoring

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting && !element._hasBeenOutOfView) {
							// Element has gone out of view for the first time
							element._hasBeenOutOfView = true;
							element._motionState = ANIMATION_STATES.SCROLL_READY;
							console.log(
								"Motion Blocks: Element went out of view, scroll animation now ready"
							);

							// Disconnect this observer and start scroll monitoring
							observer.disconnect();
							store("motion-blocks").callbacks.activateScrollAnimation(
								element,
								context,
								options
							);
						}
					});
				},
				{
					threshold: 0,
					rootMargin: "0px"
				}
			);

			observer.observe(element);
			element._outOfViewObserver = observer;
		},

		/**
		 * Activate scroll animation monitoring
		 */
		activateScrollAnimation(element, context, options) {
			if (element._motionState !== ANIMATION_STATES.SCROLL_READY) return;

			element._motionState = ANIMATION_STATES.SCROLL_ACTIVE;

			// Create scroll animation if not already created
			if (!element._animations.scroll) {
				element._animations.scroll = store(
					"motion-blocks"
				).actions.createScrollAnimation(element, context.motionPreset, options);
			}

			const scrollAnimation = element._animations.scroll;

			// If using manual scroll control, set up scroll listener
			if (scrollAnimation && !scrollAnimation.timeline) {
				let ticking = false;

				const handleScroll = () => {
					if (
						!ticking &&
						element._motionState === ANIMATION_STATES.SCROLL_ACTIVE
					) {
						requestAnimationFrame(() => {
							store("motion-blocks").actions.updateScrollAnimationProgress(
								scrollAnimation,
								element,
								options.threshold
							);
							ticking = false;
						});
						ticking = true;
					}
				};

				// Start scroll monitoring
				window.addEventListener("scroll", handleScroll, { passive: true });
				window.addEventListener("resize", handleScroll, { passive: true });

				// Store cleanup function
				if (!element._scrollCleanup) {
					element._scrollCleanup = () => {
						window.removeEventListener("scroll", handleScroll);
						window.removeEventListener("resize", handleScroll);
					};
				}
			}

			console.log("Motion Blocks: Scroll animation activated");
		},

		/**
		 * Set up scroll animation (but don't activate until needed)
		 */
		setupScrollAnimation(element, context, options) {
			// Just mark that scroll is enabled, actual setup happens later
			element._scrollEnabled = true;
			element._scrollSetup = false;
		},

		/**
		 * Setup cleanup for element removal
		 */
		setupCleanup(element) {
			// Cleanup on element removal
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					mutation.removedNodes.forEach((node) => {
						if (node === element) {
							store("motion-blocks").callbacks.cleanup(element);
							observer.disconnect();
						}
					});
				});
			});

			if (element.parentNode) {
				observer.observe(element.parentNode, { childList: true });
			}
		},

		/**
		 * Cleanup all animations and observers
		 */
		cleanup(element) {
			// Clean up animations
			if (element._animations) {
				Object.values(element._animations).forEach((animation) => {
					if (animation) animation.cancel();
				});
			}

			// Clean up observers
			if (element._observers) {
				element._observers.forEach((observer) => observer.disconnect());
			}

			if (element._outOfViewObserver) {
				element._outOfViewObserver.disconnect();
			}

			// Clean up scroll listeners
			if (element._scrollCleanup) {
				element._scrollCleanup();
			}

			console.log("Motion Blocks: Cleaned up element");
		}
	}
});

// Feature detection logging
console.log("Motion Blocks Web Animations API Features:");
console.log(
	"- Element.animate:",
	typeof Element.prototype.animate !== "undefined"
);
console.log("- ViewTimeline:", typeof ViewTimeline !== "undefined");
console.log("- ScrollTimeline:", supportsScrollTimeline());
console.log("- Prefers reduced motion:", prefersReducedMotion());

// Cleanup animations when page unloads
window.addEventListener("beforeunload", () => {
	document
		.querySelectorAll('[data-motion-enabled="true"]')
		.forEach((element) => {
			if (element._motionState) {
				store("motion-blocks").callbacks.cleanup(element);
			}
		});
});
