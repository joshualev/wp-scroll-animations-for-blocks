/**
 * Entrance Animation Logic
 * ========================
 * 
 * Handles the creation and management of entrance animations using Web Animations API.
 * These animations trigger when elements first become visible in the viewport.
 */

import { AnimationType, type WebAnimationTiming } from "@/shared/types";
import { ENTRANCE_ANIMATION_KEYFRAMES } from "@/frontend/animations/keyframes/entrance";

/**
 * Creates an entrance animation using the Web Animations API.
 * 
 * @param element - Target element to animate
 * @param type - Animation type to apply
 * @param timing - Animation timing configuration
 * @returns Web Animation instance
 */
export function createEntranceAnimation(
    element: Element,
    type: AnimationType,
    timing: WebAnimationTiming
): Animation | null {
    try {
        const keyframes = ENTRANCE_ANIMATION_KEYFRAMES[type];
        
        if (!keyframes) {
            console.error(`Unknown animation type: ${type}`);
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
