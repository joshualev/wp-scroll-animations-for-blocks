/**
 * Motion Blocks – animation utilities (TypeScript)
 * --------------------------------------------------
 * Stand-alone helpers around the Web Animations API and
 * the new CSS ViewTimeline scroll-driven animation API.
 */

/* -------------------------------------------------- */
/*  Types & preset names come from the central types module */
/* -------------------------------------------------- */

import { AnimationPreset, WebAnimationTiming } from "./types";

/* -------------------------------------------------- */
/*  Keyframe map                                      */
/* -------------------------------------------------- */

export const ANIMATION_KEYFRAMES: Record<AnimationPreset, Keyframe[]> = {
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

/* -------------------------------------------------- */
/*  Helpers                                           */
/* -------------------------------------------------- */

export const supportsViewTimeline = (): boolean =>
    typeof ViewTimeline !== "undefined";

/**
 * Build and play an Entrance animation (time-based) for the given element.
 *
 * Returns the newly created `Animation` or `null` when the preset is unknown.
 * The animation is **immediately running** – caller shouldn't call `.play()`.
 */
export function createEntranceAnimation(
    element: Element,
    preset: AnimationPreset,
    timing: Partial<WebAnimationTiming> = {}
): Animation | null {
    const { duration = 600, delay = 0, easing = 'ease-out', fill = 'forwards' } = timing;

    const keyframes = ANIMATION_KEYFRAMES[preset];
    if (!keyframes) {
        console.warn(`Motion Blocks: Unknown preset "${preset}".`);
        return null;
    }

    return element.animate(keyframes, {
        duration,
        delay,
        easing,
        fill
    });
}

/**
 * Create an animation whose progress is tied to `ViewTimeline` (i.e. scroll).
 *
 * • Uses `duration: 1` so the clock timeline is effectively ignored.  
 * • If the browser lacks the ViewTimeline API, returns `null`.
 */
export function createScrollAnimation(
    element: Element,
    preset: AnimationPreset
): Animation | null {
    if (!supportsViewTimeline()) {
        console.warn("Motion Blocks: ViewTimeline not supported – scroll animation disabled.");
        return null;
    }

    const keyframes = ANIMATION_KEYFRAMES[preset];
    if (!keyframes) {
        console.warn(`Motion Blocks: Unknown preset "${preset}".`);
        return null;
    }

    const animation = element.animate(keyframes, {
        duration: 1, // 1ms so progress is timeline-driven
        fill: "both",
        easing: "linear"
    });

    animation.timeline = new ViewTimeline({ subject: element, axis: "block"});
    return animation;
}

/**
 * Invoke a callback exactly once when the given `Animation` finishes.
 * Abstracts the verbose `addEventListener('finish', …)` pattern.
 */
export function onAnimationFinish(animation: Animation, cb: () => void): void {
    animation.addEventListener("finish", cb, { once: true });
} 