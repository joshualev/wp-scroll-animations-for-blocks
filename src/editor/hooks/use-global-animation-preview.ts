/**
 * Global Animation Preview Hook
 * =============================
 * 
 * Custom hook that encapsulates global animation preview state and actions.
 * Provides a clean interface for components that need to manage global preview.
 */

import { useSelect, useDispatch } from '@wordpress/data';
import { STORE_NAME } from '../store';

export function useGlobalAnimationPreview() {
    // Select state from store
    const { isAnimationPreviewEnabled } = useSelect(
        (select: any) => ({
            isAnimationPreviewEnabled: select(STORE_NAME).isAnimationPreviewEnabled(),
        }),
        []
    );

    // Get actions from store
    const { toggleAnimationPreview, setAnimationPreview } = useDispatch(STORE_NAME) as any;

    // Wrapped actions for better UX
    const actions = {
        toggle: () => toggleAnimationPreview(),
        enable: () => setAnimationPreview(true),
        disable: () => setAnimationPreview(false),
    };

    return {
        // State
        isPreviewEnabled: isAnimationPreviewEnabled,
        
        // Actions
        actions,
        
        // Legacy actions for backward compatibility
        toggleAnimationPreview: actions.toggle,
        setAnimationPreview,
    };
} 