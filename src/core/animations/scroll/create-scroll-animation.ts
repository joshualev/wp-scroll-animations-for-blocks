/**
 * Animation Factory
 * =================
 * 
 * Creates animations directly from MotionContext properties.
 * All configuration comes from MotionContext - no abstract configuration objects.
 * This makes it crystal clear that animations are configured from block attributes.
 */

import { MotionContext } from "@/core/types";

import { 
    type ScrollAnimationType, 
    SCROLL_ANIMATION_KEYFRAMES 
} from "@/core/animations/scroll";

// ViewTimeline API declaration
declare const ViewTimeline: any; 

/**
 * Creates a scroll animation using MotionContext scroll properties.
 * Uses: scrollCompletionPoint from MotionContext.
 * 
 * @param motionElement - Element to animate
 * @param motionContext - Block configuration with scroll properties
 * @param animationType - Specific scroll animation type
 * @returns Animation instance or null if creation fails
 */
export function createScrollAnimation(
    motionElement: HTMLElement,
    motionContext: MotionContext,
    animationType: ScrollAnimationType
): Animation | null {
    try {
        const keyframes = SCROLL_ANIMATION_KEYFRAMES[animationType];
        
        if (!keyframes) {
            console.error(`Unknown scroll animation type: ${animationType}`);
            return null;
        }
        
        const timeline = new ViewTimeline({ subject: motionElement, axis: 'block' });
        const animation = motionElement.animate(keyframes, {
            duration: 1,
            fill: 'both',
            timeline: timeline,
        });

        // Use MotionContext scroll completion point
        const safeCompletionPoint = Math.max(10, Math.min(100, motionContext.scrollCompletionPoint));
        (animation as any).rangeStart = 'entry 0%';
        (animation as any).rangeEnd = `cover ${safeCompletionPoint}%`;
        
        return animation;
        
    } catch (error) {
        console.error("Failed to create scroll animation:", error);
        return null;
    }
} 