/**
 * Scroll Observer
 * 
 * Handles observation for scroll animation transition.
 * Detects when elements leave and return to viewport to trigger scroll animations.
 */

import { MotionContext, MotionElement } from "@/shared/types";
import { setupScrollAnimation } from "../handlers/scroll-handler";

/**
 * Observes element for leaving and returning to viewport.
 * Sets up scroll animation after element completes entrance and re-enters viewport.
 * 
 * @param motionElement - Element to observe for scroll transition
 * @param motionContext - Motion configuration
 */
export function observeScrollTransition(motionElement: MotionElement, motionContext: MotionContext): void {
    console.log("Motion Blocks: Setting up scroll transition observer");
    
    let hasLeftViewport = false;

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        
        if (!entry.isIntersecting && !hasLeftViewport) {
            // Element just left viewport for the first time
            hasLeftViewport = true;
            console.log("Motion Blocks: Element left viewport - watching for return");
        } else if (entry.isIntersecting && hasLeftViewport) {
            // Element has returned to viewport after leaving
            console.log("Motion Blocks: Element returned to viewport - setting up scroll animation");
            observer.disconnect();
            setupScrollAnimation(motionElement, motionContext);
        }
    }, {
        threshold: 0, // Detect when element completely leaves viewport
        rootMargin: "50px" // Extra margin for smoother detection
    });

    observer.observe(motionElement);
    
    // Store observer reference for cleanup
    if (!motionElement._observers) {
        motionElement._observers = [];
    }
    motionElement._observers.push(observer);
} 