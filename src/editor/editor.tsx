/**
 * Motion Blocks Editor
 * ====================
 * 
 * Animation configuration AND preview using your core system!
 * Global toggle controls whether animations preview in editor.
 */

import { Fragment, useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import type { MotionContext } from "@/core/types";

import { AnimationControls } from "./components/animation-controls";

interface MotionBlocksEditorProps {
    attributes: MotionContext;
    setAttributes: (attributes: Partial<MotionContext>) => void;
}

// Global flag to ensure preview toggle only renders once
let globalToggleRendered = false;

/**
 * Motion Blocks editor with configuration AND preview
 */
export function MotionBlocksEditor({ attributes, setAttributes }: MotionBlocksEditorProps) {

    // Only show global toggle for the first instance
    useEffect(() => {
        if (!globalToggleRendered) {
            globalToggleRendered = true;
            
            // Reset flag when component unmounts (editor closes)
            return () => {
                globalToggleRendered = false;
            };
        }
    }, []);

    return (
        <Fragment>
            <InspectorControls>
                
                {/* Individual block animation controls */}
                <AnimationControls 
                    attributes={attributes} 
                    setAttributes={setAttributes} 
                />
            </InspectorControls>
        </Fragment>
    );
}

import "./store"; // Import and register the store
import "./global-preview-plugin"; // Register the global preview plugin
import "./block-integration";
import "./editor.css";
import "@/core/scss/animation.scss"; // Import animation styles for editor preview 