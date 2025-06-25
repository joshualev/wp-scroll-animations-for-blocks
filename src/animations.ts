/**
 * Motion Blocks Animation Definitions
 * ===================================
 * 
 * This module contains keyframe definitions and animation creation functions
 * for all supported motion effects. It provides a clean API for creating both
 * entrance animations and scroll-driven animations using the Web Animations API.
 */

import { AnimationPreset, type WebAnimationTiming } from "./types";

/* -------------------------------------------------- */
/*  Keyframe map                                      */
/* -------------------------------------------------- */

/**
 * Keyframe definitions for all animation presets.
 * Each preset defines the visual transformation applied to elements.
 */
export const ANIMATION_KEYFRAMES: Record<AnimationPreset, Keyframe[]> = {
    [AnimationPreset.FADE_IN]: [
        { opacity: 0 },
        { opacity: 1 }
    ],

    [AnimationPreset.SLIDE_IN_UP]: [
        { 
            opacity: 0, 
            transform: "translateY(30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateY(0)" 
        }
    ],

    [AnimationPreset.SLIDE_IN_DOWN]: [
        { 
            opacity: 0, 
            transform: "translateY(-30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateY(0)" 
        }
    ],

    [AnimationPreset.SLIDE_IN_LEFT]: [
        { 
            opacity: 0, 
            transform: "translateX(-30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateX(0)" 
        }
    ],

    [AnimationPreset.SLIDE_IN_RIGHT]: [
        { 
            opacity: 0, 
            transform: "translateX(30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateX(0)" 
        }
    ],

    [AnimationPreset.SCALE_IN]: [
        { 
            opacity: 0, 
            transform: "scale(0.8)" 
        },
        { 
            opacity: 1, 
            transform: "scale(1)" 
        }
    ],

    [AnimationPreset.BLUR_IN]: [
        { 
            opacity: 0, 
            filter: "blur(10px)" 
        },
        { 
            opacity: 1, 
            filter: "blur(0)" 
        }
    ]
};

/* -------------------------------------------------- */
/*  Helpers                                           */
/* -------------------------------------------------- */

/**
 * Detects ViewTimeline API support for scroll-driven animations.
 * @returns `true` if browser supports CSS scroll-driven animations
 */
export const supportsViewTimeline = (): boolean => {
    // Check for CSS.supports if available
    if (typeof CSS !== 'undefined' && CSS.supports) {
        const supports = CSS.supports('animation-timeline', 'view()');
        console.log(`Motion Blocks: CSS.supports('animation-timeline', 'view()') = ${supports}`);
        return supports;
    }
    
    // Fallback: check for ViewTimeline constructor
    const hasViewTimeline = typeof ViewTimeline !== "undefined";
    console.log(`Motion Blocks: ViewTimeline constructor available = ${hasViewTimeline}`);
    return hasViewTimeline;
};

/**
 * Creates an entrance animation using the Web Animations API.
 * 
 * @param element - Target element to animate
 * @param preset - Animation preset to apply
 * @param timing - Animation timing configuration
 * @returns Web Animation instance
 */
export function createEntranceAnimation(
    element: Element,
    preset: AnimationPreset,
    timing: WebAnimationTiming
): Animation | null {
    try {
        const keyframes = ANIMATION_KEYFRAMES[preset];
        
        if (!keyframes) {
            console.error(`Unknown animation preset: ${preset}`);
            return null;
        }

        console.log("Creating entrance animation with keyframes:", keyframes, "timing:", timing);

        return element.animate(keyframes, {
            duration: timing.duration,
            delay: timing.delay,
            easing: timing.easing,
            fill: timing.fill || "forwards"
        });
    } catch (error) {
        console.error("Failed to create entrance animation:", error);
        return null;
    }
}

/**
 * Creates a scroll-driven animation using Web Animations API with ViewTimeline.
 * 
 * @param element - Target element to animate
 * @param preset - Animation preset to apply
 * @param scrollRange - Scroll threshold percentage (0-100)
 * @returns Animation instance or null if failed
 */
export function createScrollAnimation(
    element: Element,
    preset: AnimationPreset,
    scrollRange: number
): Animation | null {
    try {
        const keyframes = ANIMATION_KEYFRAMES[preset];
        if (!keyframes) {
            console.error(`Motion Blocks: Unknown animation preset: ${preset}`);
            return null;
        }

        console.log(`Motion Blocks: Creating scroll animation with Web Animations API`);
        console.log(`  - Preset: ${preset}`);
        console.log(`  - Scroll range: ${scrollRange}%`);

        // Create ViewTimeline with proper options
        const viewTimelineOptions: ViewTimelineOptions = {
            subject: element,
            axis: 'block'
        };
        
        const viewTimeline = new ViewTimeline(viewTimelineOptions);

        // Simple scroll animation using Web Animations API
        // Animation reverses the entrance effect based on scroll position
        const animation = element.animate([
            keyframes[0], // Start state
            keyframes[1]  // End state
        ], {
            duration: 1,
            fill: 'both',
            timeline: viewTimeline
        });

        console.log(`Motion Blocks: Scroll animation created:`, animation);
        return animation;

    } catch (error) {
        console.warn("Motion Blocks: Failed to create scroll animation:", error);
        // Fallback: try CSS-based approach
        try {
            console.log("Motion Blocks: Trying CSS fallback for scroll animation");
            const style = (element as HTMLElement).style;
            style.setProperty('animation-timeline', 'view()');
            style.setProperty('animation-range', `entry 0% cover ${scrollRange}%`);
            return null; // No Animation object to return, but CSS is applied
        } catch (cssError) {
            console.warn("Motion Blocks: CSS fallback also failed:", cssError);
            return null;
        }
    }
}



/**
 * Registers a one-time callback for when an animation completes.
 * 
 * @param animation - Web Animation instance to monitor
 * @param callback - Function to call when animation finishes
 * 
 * @example
 * ```typescript
 * onAnimationFinish(animation, () => {
 *   console.log('Animation completed!');
 * });
 * ```
 */
export function onAnimationFinish(animation: Animation, callback: () => void): void {
    animation.addEventListener("finish", callback, { once: true });
} 