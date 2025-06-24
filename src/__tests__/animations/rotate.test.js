/**
 * Test Rotate animation
 */
import { RotateAnimation } from "../../animations/rotate.js";

describe("RotateAnimation", () => {
	test("should create rotate animation with default settings", () => {
		const animation = new RotateAnimation({});

		expect(animation.name).toBe("rotate");
		expect(animation.degrees).toBe(180);
		expect(animation.direction).toBe("clockwise");
	});

	test("should create rotate animation with custom settings", () => {
		const animation = new RotateAnimation({
			degrees: 360,
			direction: "counterclockwise"
		});

		expect(animation.degrees).toBe(360);
		expect(animation.direction).toBe("counterclockwise");
	});

	describe("getTransformForProgress", () => {
		test("should generate correct transform for clockwise rotation", () => {
			const animation = new RotateAnimation({
				degrees: 180,
				direction: "clockwise"
			});

			expect(animation.getTransformForProgress(0)).toBe("rotate(180deg)");
			expect(animation.getTransformForProgress(0.5)).toBe("rotate(90deg)");
			expect(animation.getTransformForProgress(1)).toBe("rotate(0deg)");
		});

		test("should generate correct transform for counterclockwise rotation", () => {
			const animation = new RotateAnimation({
				degrees: 180,
				direction: "counterclockwise"
			});

			expect(animation.getTransformForProgress(0)).toBe("rotate(-180deg)");
			expect(animation.getTransformForProgress(0.5)).toBe("rotate(-90deg)");
			expect(animation.getTransformForProgress(1)).toBe("rotate(0deg)");
		});

		test("should handle 360 degree rotation", () => {
			const animation = new RotateAnimation({
				degrees: 360,
				direction: "clockwise"
			});

			expect(animation.getTransformForProgress(0)).toBe("rotate(360deg)");
			expect(animation.getTransformForProgress(0.25)).toBe("rotate(270deg)");
			expect(animation.getTransformForProgress(0.5)).toBe("rotate(180deg)");
			expect(animation.getTransformForProgress(0.75)).toBe("rotate(90deg)");
			expect(animation.getTransformForProgress(1)).toBe("rotate(0deg)");
		});
	});

	describe("getAnimatedStyles", () => {
		test("should return correct styles with opacity and transform", () => {
			const animation = new RotateAnimation({ degrees: 180 });

			const styles = animation.getAnimatedStyles(0.5);
			expect(styles.opacity).toBe(0.5);
			expect(styles.transform).toBe("rotate(90deg)");
		});
	});

	describe("validateSettings", () => {
		test("should validate correct directions", () => {
			const animation1 = new RotateAnimation({ direction: "clockwise" });
			expect(animation1.validateSettings()).toBe(true);

			const animation2 = new RotateAnimation({ direction: "counterclockwise" });
			expect(animation2.validateSettings()).toBe(true);
		});

		test("should validate correct degree values", () => {
			const animation1 = new RotateAnimation({ degrees: 0 });
			expect(animation1.validateSettings()).toBe(true);

			const animation2 = new RotateAnimation({ degrees: 360 });
			expect(animation2.validateSettings()).toBe(true);

			const animation3 = new RotateAnimation({ degrees: 720 });
			expect(animation3.validateSettings()).toBe(true);
		});

		test("should reject invalid directions", () => {
			const animation = new RotateAnimation({ direction: "invalid" });
			expect(animation.validateSettings()).toBe(false);
		});

		test("should reject invalid degree values", () => {
			const animation1 = new RotateAnimation({ degrees: -10 });
			expect(animation1.validateSettings()).toBe(false);

			const animation2 = new RotateAnimation({ degrees: 1000 });
			expect(animation2.validateSettings()).toBe(false);
		});
	});
});
