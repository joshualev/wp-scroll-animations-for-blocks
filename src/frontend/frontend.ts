/**
 * Motion Blocks Frontend Entry Point
 * 
 * WordPress Interactivity API integration for motion animations.
 * This file handles only the frontend animation system.
 */

import { store, getElement, getContext } from "@wordpress/interactivity";
import { initializeMotion } from "@/core/motion-init";
import { MotionBlockContext } from "@/core/types";
import "@/core/scss/animation.scss";

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/**
 * WordPress Interactivity API store for Motion Blocks.
 * Handles the bridge between WordPress and the animation system.
 */
store("motion-blocks", {
    callbacks: {
        /**
         * Initializes motion animations for a block element.
         * Called when element mounts via `data-wp-init="callbacks.initMotion"`.
         */
        initMotion() {
            const motionContext = getContext<MotionBlockContext>();
            const motionElement = getElement().ref as HTMLElement;

            // Early validation
            if (!motionElement || !motionContext?.mb_motionEnabled) {
                console.error('❌ Early validation failed:', {
                    hasElement: !!motionElement,
                    hasContext: !!motionContext,
                    motionEnabled: motionContext?.mb_motionEnabled
                });
                return;
            }

            // Respect user's reduced motion preference
            if (prefersReducedMotion()) {
                console.info('♿ Reduced motion preference detected');
                // Ensure element is visible but not animated
                motionElement.style.opacity = "1";
                return;
            }

            if (!motionContext.mb_animationType) {
                console.warn("Motion Blocks: No animation type specified", motionContext);
                return;
            }

            try {
                initializeMotion(motionElement, motionContext);
            } catch (error) {
                console.error("Motion Blocks: Failed to initialize animation:", error);
                // Fallback: ensure element is visible
                motionElement.style.opacity = "1";
            }
        }
    }
});

