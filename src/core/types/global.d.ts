/**
 * ViewTimeline API Type Extensions
 * ================================
 * 
 * This file extends the Web Animations API interfaces to include
 * ViewTimeline-specific properties that aren't yet in the official
 * TypeScript DOM types.
 */

declare global {
  interface KeyframeAnimationOptions {
    /**
     * The ViewTimeline instance to use for scroll-driven animations.
     */
    timeline?: ViewTimeline | null;

    /**
     * The start of the animation range in ViewTimeline.
     * Examples: 'entry 0%', 'cover 25%', 'contain 50%'
     */
    rangeStart?: string;
    
    /**
     * The end of the animation range in ViewTimeline.
     * Examples: 'cover 100%', 'exit 75%', 'contain 80%'
     */
    rangeEnd?: string;
  }
}

export {}; 