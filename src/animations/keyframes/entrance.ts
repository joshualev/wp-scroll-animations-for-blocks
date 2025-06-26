/**
 * Motion Blocks Animation Definitions
 * ===================================
 * 
 * This module contains keyframe definitions and animation creation functions
 * for all supported motion effects. It provides a clean API for creating both
 * entrance animations and scroll-driven animations using the Web Animations API.
 */

import { AnimationType } from "../../types";

/**
 * Keyframe definitions for entrance animations.
 * Each type defines the visual transformation applied to elements.
 */
export const ENTRANCE_ANIMATION_KEYFRAMES: Record<AnimationType, Keyframe[]> = {
    [AnimationType.FADE_IN]: [
        { opacity: 0 },
        { opacity: 1 }
    ],

    [AnimationType.SLIDE_IN_UP]: [
        { 
            opacity: 0, 
            transform: "translateY(30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateY(0)" 
        }
    ],

    [AnimationType.SLIDE_IN_DOWN]: [
        { 
            opacity: 0, 
            transform: "translateY(-30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateY(0)" 
        }
    ],

    [AnimationType.SLIDE_IN_LEFT]: [
        { 
            opacity: 0, 
            transform: "translateX(-30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateX(0)" 
        }
    ],

    [AnimationType.SLIDE_IN_RIGHT]: [
        { 
            opacity: 0, 
            transform: "translateX(30px)" 
        },
        { 
            opacity: 1, 
            transform: "translateX(0)" 
        }
    ],

    [AnimationType.SCALE_IN]: [
        { 
            opacity: 0, 
            transform: "scale(0.8)" 
        },
        { 
            opacity: 1, 
            transform: "scale(1)" 
        }
    ],

    [AnimationType.BLUR_IN]: [
        { 
            opacity: 0, 
            filter: "blur(10px)" 
        },
        { 
            opacity: 1, 
            filter: "blur(0)" 
        }
    ]
};

