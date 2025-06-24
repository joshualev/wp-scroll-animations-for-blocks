/**
 * Test Blur animation
 */
import { BlurAnimation } from "../../animations/blur.js";

describe("BlurAnimation", () => {
	test("should create blur animation with default settings", () => {
		const animation = new BlurAnimation({});

		expect(animation.name).toBe("blur");
		expect(animation.maxBlur).toBe(10);
		expect(animation.supportedProperties).toEqual(["opacity", "filter"]);
	});

	test("should create blur animation with custom settings", () => {
		const animation = new BlurAnimation({
			maxBlur: 20
		});

		expect(animation.maxBlur).toBe(20);
	});

	describe("getInitialStyles", () => {
		test("should return initial styles with full blur", () => {
			const animation = new BlurAnimation({ maxBlur: 15 });
			const styles = animation.getInitialStyles();

			expect(styles.opacity).toBe(0);
			expect(styles.filter).toBe("blur(15px)");
		});
	});

	describe("getAnimatedStyles", () => {
		test("should return styles with decreasing blur as progress increases", () => {
			const animation = new BlurAnimation({ maxBlur: 10 });

			const styles0 = animation.getAnimatedStyles(0);
			expect(styles0.opacity).toBe(0);
			expect(styles0.filter).toBe("blur(10px)");

			const styles50 = animation.getAnimatedStyles(0.5);
			expect(styles50.opacity).toBe(0.5);
			expect(styles50.filter).toBe("blur(5px)");

			const styles100 = animation.getAnimatedStyles(1);
			expect(styles100.opacity).toBe(1);
			expect(styles100.filter).toBe("none");
		});

		test("should handle small blur amounts", () => {
			const animation = new BlurAnimation({ maxBlur: 2 });

			const styles = animation.getAnimatedStyles(0.9);
			expect(styles.opacity).toBe(0.9);
			expect(styles.filter).toContain("blur(");
			expect(styles.filter).toContain("px)");
		});
	});

	describe("getTransition", () => {
		test("should return transition string for opacity and filter", () => {
			const animation = new BlurAnimation({
				duration: 500,
				easing: "ease-in",
				delay: 100
			});

			const transition = animation.getTransition();
			expect(transition).toBe(
				"opacity 500ms ease-in 100ms, filter 500ms ease-in 100ms"
			);
		});
	});

	describe("validateSettings", () => {
		test("should validate correct blur values", () => {
			const animation1 = new BlurAnimation({ maxBlur: 0 });
			expect(animation1.validateSettings()).toBe(true);

			const animation2 = new BlurAnimation({ maxBlur: 25 });
			expect(animation2.validateSettings()).toBe(true);

			const animation3 = new BlurAnimation({ maxBlur: 50 });
			expect(animation3.validateSettings()).toBe(true);
		});

		test("should reject invalid blur values", () => {
			const animation1 = new BlurAnimation({ maxBlur: -5 });
			expect(animation1.validateSettings()).toBe(false);

			const animation2 = new BlurAnimation({ maxBlur: 100 });
			expect(animation2.validateSettings()).toBe(false);
		});
	});
});
