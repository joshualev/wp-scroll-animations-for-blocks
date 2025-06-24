/**
 * Test BaseAnimation class
 */
import { BaseAnimation } from "../../animations/base-animation.js";

describe("BaseAnimation", () => {
	let animation;

	beforeEach(() => {
		animation = new BaseAnimation({
			duration: 500,
			delay: 100,
			easing: "ease-in",
			startThreshold: 0.2,
			endThreshold: 0.8
		});
	});

	describe("constructor", () => {
		test("should set default settings", () => {
			const defaultAnimation = new BaseAnimation();

			expect(defaultAnimation.settings.duration).toBe(600);
			expect(defaultAnimation.settings.delay).toBe(0);
			expect(defaultAnimation.settings.easing).toBe("ease-out");
			expect(defaultAnimation.settings.startThreshold).toBe(0.1);
			expect(defaultAnimation.settings.endThreshold).toBe(0.9);
		});

		test("should merge custom settings with defaults", () => {
			expect(animation.settings.duration).toBe(500);
			expect(animation.settings.delay).toBe(100);
			expect(animation.settings.easing).toBe("ease-in");
			expect(animation.settings.startThreshold).toBe(0.2);
			expect(animation.settings.endThreshold).toBe(0.8);
		});
	});

	describe("calculateProgress", () => {
		test("should return 0 when ratio is below start threshold", () => {
			const progress = animation.calculateProgress(0.1, false, false);
			expect(progress).toBe(0);
		});

		test("should return 1 when ratio is above end threshold", () => {
			const progress = animation.calculateProgress(0.9, true, false);
			expect(progress).toBe(1);
		});

		test("should calculate progress between thresholds", () => {
			const progress = animation.calculateProgress(0.5, true, false);
			// (0.5 - 0.2) / (0.8 - 0.2) = 0.3 / 0.6 = 0.5
			expect(progress).toBeCloseTo(0.5);
		});

		test("should clamp progress between 0 and 1", () => {
			const progress1 = animation.calculateProgress(-0.1, true, false);
			expect(progress1).toBe(0);

			const progress2 = animation.calculateProgress(1.1, true, false);
			expect(progress2).toBe(1);
		});
	});

	describe("getTransition", () => {
		test("should return correct transition string", () => {
			const transition = animation.getTransition();
			expect(transition).toBe("opacity, transform 500ms ease-in 100ms");
		});
	});

	describe("validateSettings", () => {
		test("should return true for valid settings", () => {
			expect(animation.validateSettings()).toBe(true);
		});

		test("should return false for invalid threshold values", () => {
			const invalidAnimation1 = new BaseAnimation({ startThreshold: -0.1 });
			expect(invalidAnimation1.validateSettings()).toBe(false);

			const invalidAnimation2 = new BaseAnimation({ endThreshold: 1.1 });
			expect(invalidAnimation2.validateSettings()).toBe(false);

			const invalidAnimation3 = new BaseAnimation({
				startThreshold: 0.8,
				endThreshold: 0.2
			});
			expect(invalidAnimation3.validateSettings()).toBe(false);
		});

		test("should return false for invalid duration or delay", () => {
			const invalidAnimation1 = new BaseAnimation({ duration: 0 });
			expect(invalidAnimation1.validateSettings()).toBe(false);

			const invalidAnimation2 = new BaseAnimation({ delay: -100 });
			expect(invalidAnimation2.validateSettings()).toBe(false);
		});
	});

	describe("applyStyles", () => {
		let mockElement;

		beforeEach(() => {
			mockElement = {
				style: {}
			};
		});

		test("should apply initial styles when progress is 0", () => {
			animation.applyStyles(mockElement, 0);

			expect(mockElement.style.opacity).toBe(0);
			expect(mockElement.style.transform).toBe("none");
			expect(mockElement.style.willChange).toBe("opacity, transform");
		});

		test("should apply animated styles when progress > 0", () => {
			animation.applyStyles(mockElement, 0.5);

			expect(mockElement.style.opacity).toBe(0.5);
			expect(mockElement.style.transform).toBe("none");
		});

		test("should apply immediate styles without transition", () => {
			animation.applyStyles(mockElement, 0.5, true);

			expect(mockElement.style.transition).toBe("none");
		});
	});
});
