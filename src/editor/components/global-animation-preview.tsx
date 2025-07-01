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
import { PanelBody, ToggleControl, Button, Notice } from '@wordpress/components';
import { media } from '@wordpress/icons';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';

import { useGlobalAnimationPreview } from '../hooks';

export function GlobalAnimationPreview() {
    const { isPreviewEnabled, isEditingLocked, actions } = useGlobalAnimationPreview();

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
                            'Enable animation preview to see all your motion effects in action. While enabled, block resizing and selection will be disabled to prevent interference with animations. Animation settings remain editable in the inspector panel.',
                            'motion-blocks'
                        )}
                    </p>

                    {isEditingLocked && (
                        <Notice status="warning" isDismissible={false}>
                            <p>
                                <strong>{__('Editing Locked', 'motion-blocks')}</strong>
                            </p>
                            <p>
                                {__(
                                    'Block resizing and selection is currently disabled to prevent interference with animation previews. Animation settings remain editable in the inspector panel.',
                                    'motion-blocks'
                                )}
                            </p>
                        </Notice>
                    )}

                    <ToggleControl
                        __nextHasNoMarginBottom
                        label={__('Enable Animation Preview', 'motion-blocks')}
                        checked={isPreviewEnabled}
                        onChange={actions.toggle}
                        help={
                            isPreviewEnabled
                                ? __('Animation preview is active. Block interactions are disabled.', 'motion-blocks')
                                : __('Enable to preview all animations and disable block interactions.', 'motion-blocks')
                        }
                    />

                    {isPreviewEnabled && (
                        <div style={{ marginTop: '16px' }}>
                            <Button 
                                variant="secondary" 
                                onClick={actions.disable}
                                style={{ width: '100%' }}
                            >
                                {__('Exit Preview Mode', 'motion-blocks')}
                            </Button>
                            <p style={{ fontSize: '13px', color: '#757575', marginTop: '8px' }}>
                                {__(
                                    'Click to exit animation preview and resume normal block interactions.',
                                    'motion-blocks'
                                )}
                            </p>
                        </div>
                    )}

                    <hr style={{ margin: '24px 0' }} />

                    <h3>{__('Preview Controls', 'motion-blocks')}</h3>
                    <p style={{ fontSize: '13px', color: '#757575' }}>
                        {__(
                            'When animation preview is enabled, you can still modify animation settings for individual blocks through their inspector panels. Only block resizing and selection are disabled.',
                            'motion-blocks'
                        )}
                    </p>

                    {isPreviewEnabled && (
                        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f6fc', border: '1px solid #c3dcf7', borderRadius: '4px' }}>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 500 }}>
                                {__('💡 Tip:', 'motion-blocks')} {__(
                                    'Animation preview works best with scroll animations. Try scrolling to see scroll-based effects in action!',
                                    'motion-blocks'
                                )}
                            </p>
                        </div>
                    )}
                </PanelBody>
            </PluginSidebar>
        </Fragment>
    );
} 