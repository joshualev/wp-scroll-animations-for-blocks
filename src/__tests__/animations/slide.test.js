/**
 * Test Slide animations
 */
import {
	SlideAnimation,
	SlideDownAnimation,
	SlideLeftAnimation,
	SlideRightAnimation,
	SlideUpAnimation
} from "../../animations/slide.js";

describe("SlideAnimation", () => {
	test("should create slide animation with default settings", () => {
		const animation = new SlideAnimation({});

		expect(animation.name).toBe("slide");
		expect(animation.direction).toBe("up");
		expect(animation.distance).toBe(50);
	});

	test("should create slide animation with custom settings", () => {
		const animation = new SlideAnimation({
			direction: "left",
			distance: 100
		});

		expect(animation.direction).toBe("left");
		expect(animation.distance).toBe(100);
	});

	describe("getTransformForProgress", () => {
		test("should generate correct transform for slide up", () => {
			const animation = new SlideAnimation({ direction: "up", distance: 50 });

			expect(animation.getTransformForProgress(0)).toBe("translateY(50px)");
			expect(animation.getTransformForProgress(0.5)).toBe("translateY(25px)");
			expect(animation.getTransformForProgress(1)).toBe("translateY(0px)");
		});

		test("should generate correct transform for slide down", () => {
			const animation = new SlideAnimation({ direction: "down", distance: 50 });

			expect(animation.getTransformForProgress(0)).toBe("translateY(-50px)");
			expect(animation.getTransformForProgress(0.5)).toBe("translateY(-25px)");
			expect(animation.getTransformForProgress(1)).toBe("translateY(0px)");
		});

		test("should generate correct transform for slide left", () => {
			const animation = new SlideAnimation({ direction: "left", distance: 50 });

			expect(animation.getTransformForProgress(0)).toBe("translateX(50px)");
			expect(animation.getTransformForProgress(0.5)).toBe("translateX(25px)");
			expect(animation.getTransformForProgress(1)).toBe("translateX(0px)");
		});

		test("should generate correct transform for slide right", () => {
			const animation = new SlideAnimation({
				direction: "right",
				distance: 50
			});

			expect(animation.getTransformForProgress(0)).toBe("translateX(-50px)");
			expect(animation.getTransformForProgress(0.5)).toBe("translateX(-25px)");
			expect(animation.getTransformForProgress(1)).toBe("translateX(0px)");
		});
	});

	describe("getAnimatedStyles", () => {
		test("should return correct styles with opacity and transform", () => {
			const animation = new SlideAnimation({ direction: "up", distance: 50 });

			const styles = animation.getAnimatedStyles(0.5);
			expect(styles.opacity).toBe(0.5);
			expect(styles.transform).toBe("translateY(25px)");
		});
	});

	describe("validateSettings", () => {
		test("should validate correct directions", () => {
			const validDirections = ["up", "down", "left", "right"];

			validDirections.forEach((direction) => {
				const animation = new SlideAnimation({ direction });
				expect(animation.validateSettings()).toBe(true);
			});
		});

		test("should reject invalid directions", () => {
			const animation = new SlideAnimation({ direction: "invalid" });
			expect(animation.validateSettings()).toBe(false);
		});
	});
});

describe("SlideUpAnimation", () => {
	test("should create slide up animation", () => {
		const animation = new SlideUpAnimation();

		expect(animation.name).toBe("slide-up");
		expect(animation.direction).toBe("up");
	});
});

describe("SlideDownAnimation", () => {
	test("should create slide down animation", () => {
		const animation = new SlideDownAnimation();

		expect(animation.name).toBe("slide-down");
		expect(animation.direction).toBe("down");
	});
});

describe("SlideLeftAnimation", () => {
	test("should create slide left animation", () => {
		const animation = new SlideLeftAnimation();

		expect(animation.name).toBe("slide-left");
		expect(animation.direction).toBe("left");
	});
});

describe("SlideRightAnimation", () => {
	test("should create slide right animation", () => {
		const animation = new SlideRightAnimation();

		expect(animation.name).toBe("slide-right");
		expect(animation.direction).toBe("right");
	});
});
