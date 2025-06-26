/**
 * Scroll Animation Logic
 * ======================
 * 
 * Handles the creation and management of scroll-driven animations using Web Animations API
 * with ViewTimeline. These animations are tied to the scroll position of elements.
 */

import { AnimationType, MotionElement } from "@/shared/types";
import { SCROLL_ANIMATION_KEYFRAMES } from "@/frontend/animations/keyframes/scroll";

interface ViewTimelineOptions {
    subject: MotionElement;
    axis?: 'block' | 'inline' | 'vertical' | 'horizontal';
    inset?: string;
}

declare const ViewTimeline: {
    new (options?: ViewTimelineOptions): AnimationTimeline & {
        readonly currentTime: number | null;
    };
};

/**
 * Creates a scroll-driven animation using Web Animations API with ViewTimeline.
 * 
 * @param element - Target element to animate
 * @param animationType - Animation type to apply
 * @param scrollRange - Scroll threshold percentage (0-100)
 * @returns Animation instance or null if failed
 */

interface ScrollAnimationOptions {
    motionElement: MotionElement;
    animationType: AnimationType;
    scrollRange: number;
}

export function createScrollAnimation(
    { motionElement, animationType, scrollRange }: ScrollAnimationOptions
): Animation | null {
    try {
        const keyframes = SCROLL_ANIMATION_KEYFRAMES[animationType];
        if (!keyframes) {
            console.error(`Motion Blocks: Unknown animation type: ${animationType}`);
            return null;
        }

        // Create ViewTimeline with proper options
        const viewTimelineOptions: ViewTimelineOptions = {
            subject: motionElement,
            axis: 'block'
        };
        
        const viewTimeline = new ViewTimeline(viewTimelineOptions);

        // Scroll animation with 3-step keyframes
        // Opacity reaches 100% at middle step, directional animation continues throughout
        const animation = motionElement.animate(keyframes, {
            duration: 1,
            fill: 'both',
            timeline: viewTimeline
        });

        return animation;

    } catch (error) {
        console.warn("Motion Blocks: Failed to create scroll animation:", error);
        return fallbackToCSS(motionElement, scrollRange);
    }
}

/**
 * Fallback to CSS-based scroll animation when Web Animations API fails.
 * 
 * @param element - Target element
 * @param scrollRange - Scroll threshold percentage
 * @returns null (no Animation object, but CSS is applied)
 */
function fallbackToCSS(motionElement: MotionElement, scrollRange: number): null {
    try {
        const style = (motionElement as HTMLElement).style;
        style.setProperty('animation-timeline', 'view()');
        style.setProperty('animation-range', `entry 0% cover ${scrollRange}%`);
        return null; // No Animation object to return, but CSS is applied
    } catch (cssError) {
        console.warn("Motion Blocks: CSS fallback also failed:", cssError);
        return null;
    }
}


