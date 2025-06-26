/**
 * Element State Management
 * 
 * Handles initialization and management of motion-specific runtime state on DOM elements.
 */

import { MotionElement, MotionState } from "@/shared/types";

/**
 * Initializes runtime state properties on a motion element.
 * This sets up the element for animation tracking and management.
 * 
 * @param motionElement - Target element to initialize
 */
export function initializeElementState(motionElement: MotionElement): void {
    motionElement._motionState = MotionState.IDLE;
    motionElement._animations = {};
    motionElement._observers = [];
}

/**
 * Cleans up runtime state and stops all active animations/observers.
 * 
 * @param motionElement - Target element to clean up
 */
export function cleanupElementState(motionElement: MotionElement): void {
    // Cancel all active animations
    if (motionElement._animations) {
        Object.values(motionElement._animations).forEach(animation => {
            animation.cancel();
        });
        motionElement._animations = {};
    }

    // Disconnect all observers
    if (motionElement._observers) {
        motionElement._observers.forEach(observer => {
            observer.disconnect();
        });
        motionElement._observers = [];
    }

    // Reset state
    motionElement._motionState = MotionState.IDLE;
} 