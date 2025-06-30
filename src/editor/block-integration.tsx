/**
 * Block Integration
 * ================
 * 
 * Integrates Motion Blocks with WordPress block editor.
 * Adds motion controls to all blocks via higher-order component.
 */

import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import type { BlockConfiguration } from "@wordpress/blocks";
import type { ComponentType } from "react";

import { MotionBlocksEditor } from "./editor";
import type { MotionContext } from "@/core/types";

// BlockEditProps type for editor component
interface BlockEditProps {
    attributes: MotionContext & Record<string, any>;
    setAttributes: (attributes: Partial<MotionContext>) => void;
    [key: string]: any;
}

/**
 * Extends all block configurations with motion animation attributes.
 * @param settings - Block configuration object from WordPress
 * @returns Modified configuration with motion attributes
 */
function addMotionAttributes(settings: BlockConfiguration): BlockConfiguration {
    const existingAttributes = settings.attributes || {};

    return {
        ...settings,
        attributes: {
            ...existingAttributes,
            motionEnabled: { type: "boolean", default: false },
            scrollAnimationEnabled: { type: "boolean", default: false },
            entranceAnimationType: { type: "string", default: "none" },
            scrollAnimationType: { type: "string", default: "none" },
            motionDuration: { type: "number", default: 1000 },
            motionDelay: { type: "number", default: 0 },
            motionTimingFunction: { type: "string", default: "ease-out" },
            motionThreshold: { type: "number", default: 20 },
            scrollCompletionPoint: { type: "number", default: 90 }
        }
    };
}

/**
 * Higher-order component that adds motion controls to the block inspector.
 * Wraps the original BlockEdit component with additional UI controls.
 */
const withMotionControls = createHigherOrderComponent(
    (BlockEdit: ComponentType<any>) => {
        return (props: BlockEditProps) => {
            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <MotionBlocksEditor 
                        attributes={props.attributes}
                        setAttributes={props.setAttributes}
                    />
                </Fragment>
            );
        };
    },
    "withMotionControls"
);

// Apply block modifications
addFilter("blocks.registerBlockType", "motion-blocks/add-attributes", addMotionAttributes);
addFilter("editor.BlockEdit", "motion-blocks/with-controls", withMotionControls); 