/**
 * Motion Preview Hook
 * ===================
 * 
 * Simple preview integration using WordPress compose utilities.
 * Enables motion animation preview in the block editor.
 */

import { useEffect, useCallback, useRef, RefObject } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useDebounce } from '@wordpress/compose';
import { observeElementAndTriggerMotion } from '@/core/motion-trigger';
import type { MotionBlockContext } from '@/core/types';
import { GLOBAL_MOTION_BLOCKS_STORE } from '@/editor/global-controls/store';

interface UseMotionPreviewProps {
    clientId: string;
    blockRef: RefObject<HTMLElement | null>;
    context: MotionBlockContext;
    enabled: boolean;
}

/**
 * Hook that enables motion preview in the editor.
 * Uses WordPress useDebounce for proper function debouncing and global store for preview toggle.
 */
export function useMotionPreview({ blockRef, context, enabled }: UseMotionPreviewProps) {
    const previousPreviewState = useRef(false);

    // Check global animation preview state
    const { isAnimationPreviewEnabled } = useSelect(
        (select: any) => ({
            isAnimationPreviewEnabled: select(GLOBAL_MOTION_BLOCKS_STORE).isAnimationPreviewEnabled() || false,
        }),
        []
    );
    
    // Only enable preview if both individual block enabled AND global preview is on
    const shouldPreview = enabled && isAnimationPreviewEnabled;

    // Create debounced animation setup function using WordPress useDebounce
    const setupAnimation = useCallback(() => {
        if (!shouldPreview || !blockRef.current || !context.mb_animationType) {
            return;
        }

        const element = blockRef.current;

        // Cancel any existing animations first
        try {
            const existingAnimations = element.getAnimations();
            existingAnimations.forEach(animation => animation.cancel());
        } catch (error) {
            // Ignore cleanup errors
        }

        try {
            // Use core motion logic - same as frontend
            observeElementAndTriggerMotion(element, context);
        } catch (error) {
            console.error('Motion Blocks: Preview setup failed:', error);
        }
    }, [
        shouldPreview, 
        // Only include animation-relevant properties to prevent unnecessary triggers
        context.mb_animationType,
        context.mb_duration,
        context.mb_speedCurve,
        context.mb_threshold,
        context.mb_scrollCompletionPoint,
        context.mb_scrollAnimationEnabled
    ]);

    // Debounce the animation setup to prevent spam during rapid changes
    const debouncedSetupAnimation = useDebounce(setupAnimation, 300);

    useEffect(() => {
        const wasPreviewEnabled = previousPreviewState.current;
        const isPreviewEnabled = shouldPreview;
        
        // Only trigger animation setup when:
        // 1. Preview is first turned ON (false -> true)
        // 2. Preview is already on AND animation values changed (debounced)
        if (isPreviewEnabled && (!wasPreviewEnabled || wasPreviewEnabled)) {
            if (!wasPreviewEnabled) {
                // Preview just turned ON - trigger immediately
                setupAnimation();
            } else {
                // Preview was already on - use debounced version for value changes
                debouncedSetupAnimation();
            }
        }

        // Update previous state
        previousPreviewState.current = isPreviewEnabled;

        // Cleanup animations when preview is turned off or unmounts
        return () => {
            if (!blockRef.current || !wasPreviewEnabled) return;
            
            try {
                const animations = blockRef.current.getAnimations();
                animations.forEach(animation => animation.cancel());
            } catch (error) {
                console.warn('Motion Blocks: Animation cleanup failed:', error);
            }
        };
    }, [shouldPreview, setupAnimation, debouncedSetupAnimation]);

    return {
        isPreviewActive: shouldPreview
    };
}