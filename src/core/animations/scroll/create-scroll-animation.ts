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
    getScrollKeyframes
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
 */
export function createScrollAnimation(
    motionElement: HTMLElement,
    motionContext: MotionContext,
    animationType: ScrollAnimationType
): void {
    try {
        const keyframes = getScrollKeyframes(animationType);
        
        if (!keyframes) {
            console.error(`Unknown scroll animation type: ${animationType}`);
            return;
        }
        
        const safeCompletionPoint = Math.max(10, Math.min(100, motionContext.scrollCompletionPoint));
        const timeline = new ViewTimeline({ 
            subject: motionElement, 
            axis: 'block'
        });
        
        // Use MotionContext scroll properties directly
        motionElement.animate(keyframes, {
            duration: 1,
            fill: 'both',
            timeline: timeline,
            rangeStart: 'entry 0%',
            rangeEnd: `cover ${safeCompletionPoint}%`,
        });
        
    } catch (error) {
        console.error("Failed to create scroll animation:", error);
    }
} 