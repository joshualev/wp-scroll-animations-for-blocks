/**
 * Motion Blocks Frontend Entry Point
 * 
 * WordPress Interactivity API integration for motion animations.
 * This file handles only the WordPress-specific integration layer.
 */

import { store, getElement, getContext } from "@wordpress/interactivity";
import { initializeMotion } from "@/frontend/motion-orchestrator";
import { MotionContext, MotionElement } from "@/shared/types";

import "./frontend.scss";

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
            const motionContext = getContext<MotionContext>();
            const motionElement = getElement().ref as MotionElement;


            console.log("Motion Blocks: Initializing with context:", {
                motionEnabled: motionContext?.motionEnabled,
                entranceAnimationType: motionContext?.entranceAnimationType,
                scrollAnimationType: motionContext?.scrollAnimationType,
                motionThreshold: motionContext?.motionThreshold,
                motionDuration: motionContext?.motionDuration
            });

            // Early validation
            if (!motionElement || !motionContext?.motionEnabled) {
                console.warn("Motion Blocks: Skipping - element missing or motion disabled");
                return;
            }

            // If the user has reduced motion preference, we don't want to animate the element
            if (prefersReducedMotion()) {
                console.warn("Motion Blocks: Animations disabled due to reduced motion preference");
                return;
            }

            if (!motionContext.entranceAnimationType) {
                console.warn("Motion Blocks: No animation type specified");
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

