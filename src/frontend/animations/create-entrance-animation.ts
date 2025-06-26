/**
 * Entrance Animation Logic
 * ========================
 * 
 * Handles the creation and management of entrance animations using Web Animations API.
 * These animations trigger when elements first become visible in the viewport.
 */

import { EntranceAnimationType, MotionElement, type WebAnimationTiming } from "@/shared/types";
import { ENTRANCE_ANIMATION_KEYFRAMES } from "@/frontend/animations/keyframes/entrance";

/**
 * Creates an entrance animation using the Web Animations API.
 * 
 * @param element - Target element to animate
 * @param animationType - Animation type to apply
 * @param timing - Animation timing configuration
 * @returns Web Animation instance
 */

interface EntranceAnimationOptions {
    motionElement: MotionElement;
    animationType: EntranceAnimationType;
    timing: WebAnimationTiming;
}

export function createEntranceAnimation(
    { motionElement, animationType, timing }: EntranceAnimationOptions
): Animation | null {
    try {
        const keyframes = ENTRANCE_ANIMATION_KEYFRAMES[animationType];
        
        if (!keyframes) {
            console.error(`Unknown animation type: ${animationType}`);
            return null;
        }

        return motionElement.animate(keyframes, {
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
