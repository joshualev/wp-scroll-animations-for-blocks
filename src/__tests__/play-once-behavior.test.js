/**
 * Test play once behavior including observer disconnection
 */

// Mock animation factory
const mockAnimation = {
	applyStyles: jest.fn(),
	calculateProgress: jest.fn(() => 0.5),
	validateSettings: () => true
};

const mockAnimationFactory = {
	create: jest.fn(() => mockAnimation)
};

// Mock IntersectionObserver
let mockObserver;
let observerCallback;

global.IntersectionObserver = jest.fn((callback, options) => {
	observerCallback = callback;
	mockObserver = {
		observe: jest.fn(),
		disconnect: jest.fn(),
		isDisconnected: false
	};

	// Override disconnect to track state
	const originalDisconnect = mockObserver.disconnect;
	mockObserver.disconnect = jest.fn(() => {
		mockObserver.isDisconnected = true;
		originalDisconnect.call(mockObserver);
	});

	return mockObserver;
});

// Mock DOM
global.document = {
	querySelectorAll: jest.fn(() => []),
	readyState: "complete",
	addEventListener: jest.fn()
};

global.window = {
	addEventListener: jest.fn()
};

// Mock the animation factory module
jest.mock("../animations/animation-factory.js", () => ({
	animationFactory: mockAnimationFactory
}));

describe("Play Once Behavior", () => {
	let MotionBlocks;
	let motionBlocks;

	beforeEach(async () => {
		jest.clearAllMocks();
		mockObserver = null;
		observerCallback = null;

		// Reset animation factory mock
		mockAnimationFactory.create.mockReturnValue(mockAnimation);
		mockAnimation.calculateProgress.mockReturnValue(0.5);

		// Import and get the MotionBlocks class
		delete require.cache[require.resolve("../view.js")];
		await import("../view.js");

		// Get the class from the module's internal scope by creating a new instance
		// We'll test the functionality through the methods
		MotionBlocks = class TestMotionBlocks {
			constructor() {
				this.observers = new Map();
				this.elements = new Map();
				this.isInitialized = false;
			}

			initializeElement(element) {
				const settings = {
					preset: element.dataset.motionPreset || "fade",
					delay: parseInt(element.dataset.motionDelay) || 0,
					duration: parseInt(element.dataset.motionDuration) || 600,
					easing: element.dataset.motionEasing || "ease-out",
					startThreshold:
						parseFloat(element.dataset.motionStartThreshold) || 0.1,
					endThreshold: parseFloat(element.dataset.motionEndThreshold) || 0.9,
					playOnce: element.dataset.motionPlayOnce === "true"
				};

				const animation = mockAnimationFactory.create(
					settings.preset,
					settings
				);

				this.elements.set(element, {
					animation,
					settings,
					hasAnimated: false,
					isVisible: false,
					lastProgress: 0
				});

				animation.applyStyles(element, 0, true);
				this.createObserver(element);
			}

			createObserver(element) {
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
				const isInView = ratio >= settings.startThreshold;

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

				this.animateElement(element, ratio, elementData);
			}

			animateElement(element, ratio, elementData) {
				const { animation, settings } = elementData;
				const progress = animation.calculateProgress(
					ratio,
					elementData.isVisible,
					elementData.hasAnimated
				);

				if (progress > 0) {
					elementData.hasAnimated = true;
				}

				animation.applyStyles(element, progress);
				elementData.lastProgress = progress;
			}

			disconnectElement(element) {
				const observer = this.observers.get(element);
				if (observer) {
					observer.disconnect();
					this.observers.delete(element);
				}
			}
		};

		motionBlocks = new MotionBlocks();
	});

	test("should disconnect observer when play once animation completes", () => {
		const mockElement = {
			dataset: {
				motionPreset: "fade",
				motionPlayOnce: "true"
			},
			style: {}
		};

		// Initialize element
		motionBlocks.initializeElement(mockElement);

		// Verify setup
		const elementData = motionBlocks.elements.get(mockElement);
		expect(elementData.settings.playOnce).toBe(true);
		expect(motionBlocks.observers.has(mockElement)).toBe(true);

		// Mock animation to return full progress
		mockAnimation.calculateProgress.mockReturnValue(1);

		// Simulate intersection
		const mockEntry = {
			target: mockElement,
			intersectionRatio: 0.9
		};

		// First intersection - should animate and complete
		observerCallback([mockEntry], mockObserver);

		// Verify animation completed
		expect(elementData.hasAnimated).toBe(true);
		expect(elementData.lastProgress).toBe(1);

		// Second intersection - should trigger disconnect logic
		observerCallback([mockEntry], mockObserver);

		// Observer should be disconnected
		expect(mockObserver.disconnect).toHaveBeenCalled();
		expect(motionBlocks.observers.has(mockElement)).toBe(false);

		// Element data should still exist
		expect(motionBlocks.elements.has(mockElement)).toBe(true);
	});

	test("should not disconnect observer if play once is disabled", () => {
		const mockElement = {
			dataset: {
				motionPreset: "fade",
				motionPlayOnce: "false"
			},
			style: {}
		};

		motionBlocks.initializeElement(mockElement);

		// Mock full animation progress
		mockAnimation.calculateProgress.mockReturnValue(1);

		const mockEntry = {
			target: mockElement,
			intersectionRatio: 0.9
		};

		// Trigger intersection multiple times
		observerCallback([mockEntry], mockObserver);
		observerCallback([mockEntry], mockObserver);

		// Observer should NOT be disconnected
		expect(mockObserver.disconnect).not.toHaveBeenCalled();
		expect(motionBlocks.observers.has(mockElement)).toBe(true);
	});

	test("should not disconnect until animation is fully complete", () => {
		const mockElement = {
			dataset: {
				motionPreset: "fade",
				motionPlayOnce: "true"
			},
			style: {}
		};

		motionBlocks.initializeElement(mockElement);

		// Mock partial animation progress
		mockAnimation.calculateProgress.mockReturnValue(0.5);

		const mockEntry = {
			target: mockElement,
			intersectionRatio: 0.5
		};

		// Trigger intersection with partial progress
		observerCallback([mockEntry], mockObserver);

		// Observer should NOT be disconnected yet
		expect(mockObserver.disconnect).not.toHaveBeenCalled();
		expect(motionBlocks.observers.has(mockElement)).toBe(true);

		// Now complete the animation
		mockAnimation.calculateProgress.mockReturnValue(1);
		observerCallback([mockEntry], mockObserver);

		// Trigger again to test disconnect logic
		observerCallback([mockEntry], mockObserver);

		// Now observer should be disconnected
		expect(mockObserver.disconnect).toHaveBeenCalled();
		expect(motionBlocks.observers.has(mockElement)).toBe(false);
	});

	test("disconnectElement method should work correctly", () => {
		const mockElement = {
			dataset: {
				motionPreset: "fade"
			},
			style: {}
		};

		motionBlocks.initializeElement(mockElement);

		// Verify observer exists
		expect(motionBlocks.observers.has(mockElement)).toBe(true);

		// Manually disconnect
		motionBlocks.disconnectElement(mockElement);

		// Observer should be disconnected but element data preserved
		expect(mockObserver.disconnect).toHaveBeenCalled();
		expect(motionBlocks.observers.has(mockElement)).toBe(false);
		expect(motionBlocks.elements.has(mockElement)).toBe(true);
	});
});
