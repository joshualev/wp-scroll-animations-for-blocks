/**
 * Scroll Animation Logic
 * ======================
 * 
 * Handles the creation and management of scroll-driven animations using Web Animations API
 * with ViewTimeline. These animations are tied to the scroll position of elements.
 */

import { AnimationType } from "../types";
import { SCROLL_ANIMATION_KEYFRAMES } from "./keyframes/scroll";

interface ViewTimelineOptions {
    subject: Element;
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
 * @param type - Animation type to apply
 * @param scrollRange - Scroll threshold percentage (0-100)
 * @returns Animation instance or null if failed
 */
export function createScrollAnimation(
    element: Element,
    type: AnimationType,
    scrollRange: number
): Animation | null {
    try {
        const keyframes = SCROLL_ANIMATION_KEYFRAMES[type];
        if (!keyframes) {
            console.error(`Motion Blocks: Unknown animation type: ${type}`);
            return null;
        }

        console.log(`Motion Blocks: Creating scroll animation with Web Animations API`);
        console.log(`  - Type: ${type}`);
        console.log(`  - Scroll range: ${scrollRange}%`);
        console.log(`  - Using scroll-specific keyframes:`, keyframes);


        // Create ViewTimeline with proper options
        const viewTimelineOptions: ViewTimelineOptions = {
            subject: element,
            axis: 'block'
        };
        
        const viewTimeline = new ViewTimeline(viewTimelineOptions);

        // Scroll animation with 3-step keyframes
        // Opacity reaches 100% at middle step, directional animation continues throughout
        const animation = element.animate(keyframes, {
            duration: 1,
            fill: 'both',
            timeline: viewTimeline
        });

        console.log(`Motion Blocks: Scroll animation created:`, animation);
        return animation;

    } catch (error) {
        console.warn("Motion Blocks: Failed to create scroll animation:", error);
        return fallbackToCSS(element, scrollRange);
    }
}

/**
 * Fallback to CSS-based scroll animation when Web Animations API fails.
 * 
 * @param element - Target element
 * @param scrollRange - Scroll threshold percentage
 * @returns null (no Animation object, but CSS is applied)
 */
function fallbackToCSS(element: Element, scrollRange: number): null {
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


