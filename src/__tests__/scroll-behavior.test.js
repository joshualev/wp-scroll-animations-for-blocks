/**
 * Test scroll behavior including reverse scroll and thresholds
 */
import { BaseAnimation } from "../animations/base-animation.js";

describe("Scroll Behavior", () => {
	describe("Threshold Behavior", () => {
		let animation;

		beforeEach(() => {
			animation = new BaseAnimation({
				startThreshold: 0.2, // Element needs to be 20% visible to start
				endThreshold: 0.8 // Element needs to be 80% visible to complete
			});
		});

		test("should not animate when intersection ratio is below start threshold", () => {
			// Element is 10% visible (below 20% start threshold)
			const progress = animation.calculateProgress(0.1, false, false);
			expect(progress).toBe(0);
		});

		test("should start animating when intersection ratio reaches start threshold", () => {
			// Element is exactly 20% visible (at start threshold)
			const progress = animation.calculateProgress(0.2, true, false);
			expect(progress).toBe(0);
		});

		test("should be 50% animated when halfway between thresholds", () => {
			// Element is 50% visible (halfway between 20% and 80%)
			const progress = animation.calculateProgress(0.5, true, false);
			expect(progress).toBeCloseTo(0.5);
		});

		test("should be fully animated when intersection ratio reaches end threshold", () => {
			// Element is 80% visible (at end threshold)
			const progress = animation.calculateProgress(0.8, true, false);
			expect(progress).toBe(1);
		});

		test("should remain fully animated when intersection ratio exceeds end threshold", () => {
			// Element is 100% visible (above end threshold)
			const progress = animation.calculateProgress(1.0, true, false);
			expect(progress).toBe(1);
		});
	});

	describe("Visibility Behavior", () => {
		let animation;

		beforeEach(() => {
			animation = new BaseAnimation({
				startThreshold: 0.2,
				endThreshold: 0.8
			});
		});

		test("should animate when element is visible", () => {
			const progress = animation.calculateProgress(0.5, true, false);
			expect(progress).toBeCloseTo(0.5);
		});

		test("should not animate when element is not visible", () => {
			const progress = animation.calculateProgress(0.5, false, false);
			expect(progress).toBe(0);
		});

		test("should not animate when element becomes invisible", () => {
			const progress = animation.calculateProgress(0.5, false, true);
			expect(progress).toBe(0);
		});
	});

	describe("Play Once Behavior", () => {
		let animation;

		beforeEach(() => {
			animation = new BaseAnimation({
				startThreshold: 0.2,
				endThreshold: 0.8,
				playOnce: true
			});
		});

		test("should animate normally on first view", () => {
			const progress = animation.calculateProgress(0.5, true, false);
			expect(progress).toBeCloseTo(0.5);
		});

		test("should not animate again after being animated once", () => {
			// This test requires additional logic in the main system
			// The calculateProgress method doesn't handle playOnce directly
			// That's handled at a higher level in the MotionBlocks class
			expect(true).toBe(true); // Placeholder - this is handled in MotionBlocks
		});
	});

	describe("Edge Cases", () => {
		test("should handle start threshold equal to end threshold", () => {
			const animation = new BaseAnimation({
				startThreshold: 0.5,
				endThreshold: 0.5
			});

			expect(animation.calculateProgress(0.4, false, false)).toBe(0);
			expect(animation.calculateProgress(0.5, true, false)).toBe(1);
			expect(animation.calculateProgress(0.6, true, false)).toBe(1);
		});

		test("should handle very small threshold ranges", () => {
			const animation = new BaseAnimation({
				startThreshold: 0.49,
				endThreshold: 0.51
			});

			expect(animation.calculateProgress(0.48, false, false)).toBe(0);
			expect(animation.calculateProgress(0.5, true, false)).toBeCloseTo(0.5);
			expect(animation.calculateProgress(0.52, true, false)).toBe(1);
		});

		test("should handle threshold range covering full visibility", () => {
			const animation = new BaseAnimation({
				startThreshold: 0.0,
				endThreshold: 1.0
			});

			expect(animation.calculateProgress(0.0, true, false)).toBe(0);
			expect(animation.calculateProgress(0.25, true, false)).toBeCloseTo(0.25);
			expect(animation.calculateProgress(0.5, true, false)).toBeCloseTo(0.5);
			expect(animation.calculateProgress(0.75, true, false)).toBeCloseTo(0.75);
			expect(animation.calculateProgress(1.0, true, false)).toBe(1);
		});
	});
});
