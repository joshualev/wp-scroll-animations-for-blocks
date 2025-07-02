/**
 * Motion Preview Hook
 * ===================
 * 
 * Direct integration with core motion system for editor previews.
 * Uses direct ref access instead of DOM searching.
 */

import { useEffect, useState, RefObject, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { createEntranceAnimation, isValidEntranceAnimation } from '@/core/animations/entrance';
import { createScrollAnimation, isValidScrollAnimation } from '@/core/animations/scroll';
import type { MotionContext } from '@/core/types';
import { STORE_NAME } from '../store';

interface UseMotionPreviewProps {
    clientId: string;
    blockRef: RefObject<HTMLElement | null>;
    context: MotionContext;
    enabled: boolean;
}

/**
 * Custom debounce hook for motion context changes
 * Prevents animation spam during rapid setting adjustments
 */
function useDebouncedMotionContext(context: MotionContext, delay: number = 300) {
    const [debouncedContext, setDebouncedContext] = useState(context);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout for debounced update
        timeoutRef.current = setTimeout(() => {
            setDebouncedContext(context);
        }, delay);

        // Cleanup timeout on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [
        context.entranceAnimationType,
        context.scrollAnimationType, 
        context.scrollAnimationEnabled,
        context.motionDuration,
        context.motionDelay,
        context.motionTimingFunction,
        context.motionThreshold,
        context.scrollCompletionPoint,
        delay
    ]);

    return debouncedContext;
}

/**
 * Hook that enables motion preview in the editor using direct animation creation
 * Bypasses observer pattern for immediate, real-time updates with smart debouncing
 */
export function useMotionPreview({ clientId, blockRef, context, enabled }: UseMotionPreviewProps) {
    const [isInitialized, setIsInitialized] = useState(false);
    const thresholdTimeoutRef = useRef<NodeJS.Timeout>();
    
    // Check global animation preview state
    const { isAnimationPreviewEnabled } = useSelect(
        (select: any) => ({
            isAnimationPreviewEnabled: select(STORE_NAME)?.isAnimationPreviewEnabled?.() || false,
        }),
        []
    );
    
    // Debounce rapid context changes to prevent animation spam
    const debouncedContext = useDebouncedMotionContext(context, 200); // 200ms threshold
    
    // Only enable preview if both individual block is enabled AND global preview is on
    const shouldPreview = enabled && isAnimationPreviewEnabled;

    // Initialize motion when preview is enabled and ref is available
    useEffect(() => {
        const blockElement = blockRef.current;
        
        if (!blockElement || !shouldPreview) {
            return;
        }
        
        // Check if this block has any animation configured
        const hasEntranceAnimation = !!debouncedContext.entranceAnimationType;
        const hasScrollAnimation = debouncedContext.scrollAnimationEnabled && !!debouncedContext.scrollAnimationType;
        
        if (!hasEntranceAnimation && !hasScrollAnimation) {
            return;
        }

        // Clear any existing animations first for clean re-initialization
        blockElement.style.animation = '';
        blockElement.style.opacity = '';
        blockElement.style.transform = '';
        
        // Apply the same classes/attributes that PHP adds on frontend
        // This is needed for editor preview since PHP render_block doesn't run in editor
        blockElement.classList.add('has-motion');
        blockElement.setAttribute('data-motion-enabled', 'true');
        blockElement.setAttribute('data-motion-preset', 
            debouncedContext.entranceAnimationType || debouncedContext.scrollAnimationType || 'fade-in');
        
        try {
            // DIRECT ANIMATION CREATION - No observer delay for editor preview
            if (hasScrollAnimation && supportsViewTimeline()) {
                // Create scroll animation directly (no threshold simulation needed for scroll)
                createScrollAnimation(blockElement, debouncedContext, debouncedContext.scrollAnimationType!);
                setIsInitialized(true);
            } else if (hasEntranceAnimation) {
                // Simulate threshold behavior in editor preview
                // Lower threshold = triggers sooner (less visibility needed)
                // Higher threshold = triggers later (more visibility needed)  
                const thresholdDelay = debouncedContext.motionThreshold! * 10; // 0-1000ms delay
                
                setIsInitialized(true); // Mark as initialized immediately
                
                // Clear any existing threshold timeout
                if (thresholdTimeoutRef.current) {
                    clearTimeout(thresholdTimeoutRef.current);
                }
                
                thresholdTimeoutRef.current = setTimeout(() => {
                    if (blockElement) {
                        // Create entrance animation with simulated threshold timing
                        createEntranceAnimation(blockElement, debouncedContext, debouncedContext.entranceAnimationType!);
                    }
                }, thresholdDelay);
            }
        } catch (error) {
            console.error('❌ Motion preview failed:', error);
        }

        // Cleanup function for real-time updates
        return () => {
            if (blockElement) {
                // Cancel any running animations
                const animations = blockElement.getAnimations();
                animations.forEach(animation => animation.cancel());
                
                // Clear threshold timeout
                if (thresholdTimeoutRef.current) {
                    clearTimeout(thresholdTimeoutRef.current);
                }
                
                // Reset styles
                blockElement.style.animation = '';
                blockElement.style.opacity = '';
                blockElement.style.transform = '';
                
                // Remove editor-specific classes on cleanup
                blockElement.classList.remove('has-motion');
                blockElement.removeAttribute('data-motion-enabled');
                blockElement.removeAttribute('data-motion-preset');
            }
            setIsInitialized(false);
        };
    }, [
        blockRef.current, // Re-run when ref changes
        shouldPreview, // When preview state changes (local + global)
        debouncedContext, // Use debounced context instead of raw context
        clientId
    ]);

    // Subscribe to global preview changes
    useEffect(() => {
        if (!enabled) return; // Don't subscribe if block doesn't need motion
        
        // return unsubscribe;
    }, [clientId, enabled]); // Only subscribe if block needs motion

    return {
        previewEnabled: enabled,
        hasRef: !!blockRef.current,
        motionEnabled: context.motionEnabled
    };
}

/**
 * Check ViewTimeline support for scroll animations
 */
function supportsViewTimeline(): boolean {
    return typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()');
} 