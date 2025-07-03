/**
 * Global Animation Preview
 * ========================
 * 
 * Provides a global animation preview toggle using WordPress PluginSidebar
 * and PluginSidebarMoreMenuItem components. This allows users to preview 
 * all animations while locking block editing interactions.
 */

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { media } from '@wordpress/icons';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';

import { GLOBAL_MOTION_BLOCKS_STORE } from './store';

// Hook moved directly into this file
function useGlobalAnimationPreview() {
    // Select state from store
    const { isAnimationPreviewEnabled } = useSelect(
        (select: any) => ({
            isAnimationPreviewEnabled: select(GLOBAL_MOTION_BLOCKS_STORE).isAnimationPreviewEnabled(),
        }),
        []
    );

    // Get actions from store
    const { toggleAnimationPreview, setAnimationPreview } = useDispatch(GLOBAL_MOTION_BLOCKS_STORE);

    return {
        // State
        isPreviewEnabled: isAnimationPreviewEnabled,
        
        toggleAnimationPreview: toggleAnimationPreview,
        setAnimationPreview,
    };
}

export function GlobalAnimationPreview() {
    const { isPreviewEnabled, toggleAnimationPreview } = useGlobalAnimationPreview();

    return (
        <Fragment>
            {/* Menu item that appears in the three-dot menu */}
            <PluginSidebarMoreMenuItem target="motion-blocks-preview-sidebar" icon={media}>
                {__('Animation Preview', 'motion-blocks')}
            </PluginSidebarMoreMenuItem>

            {/* The actual sidebar panel */}
            <PluginSidebar
                name="motion-blocks-preview-sidebar"
                icon={media}
                title={__('Animation Preview', 'motion-blocks')}
            >
                <PanelBody>
                    <h2>{__('Global Animation Preview', 'motion-blocks')}</h2>
                    <p>
                        {__(
                            'Enable animation preview to see all your motion effects in action.',
                            'motion-blocks'
                        )}
                    </p>

                    <ToggleControl
                        __nextHasNoMarginBottom
                        label={__('Enable Animation Preview', 'motion-blocks')}
                        checked={isPreviewEnabled}
                        onChange={toggleAnimationPreview}
                        help={
                            isPreviewEnabled
                                ? __('Animation preview is active. Block interactions are disabled.', 'motion-blocks')
                                : __('Enable to preview all animations.', 'motion-blocks')
                        }
                    />
                </PanelBody>
            </PluginSidebar>
        </Fragment>
    );
} 