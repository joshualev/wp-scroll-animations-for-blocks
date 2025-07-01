/**
 * Global Preview Plugin Registration
 * ==================================
 * 
 * Registers the global animation preview plugin with WordPress.
 * Simple plugin wrapper that renders the main preview component.
 */

import { Fragment } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { GlobalAnimationPreview } from './components/global-animation-preview';

function GlobalPreviewManager() {
    return (
        <Fragment>
            <GlobalAnimationPreview />
        </Fragment>
    );
}

// Register the plugin
registerPlugin('motion-blocks-global-preview', {
    render: GlobalPreviewManager,
}); 