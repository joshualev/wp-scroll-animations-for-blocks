/**
 * Block Integration
 * ================
 * 
 * Integrates Motion Blocks with WordPress block editor.
 * Adds motion controls to all blocks AND enables preview using direct refs!
 */

import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment, useState } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import type { BlockConfiguration } from "@wordpress/blocks";
import type { ComponentType } from "react";

import { MotionBlocksEditor } from "./editor";
import { useMotionPreview } from "./hooks/use-motion-preview";
import type { MotionContext } from "@/core/types";

// BlockEditProps type for editor component
interface BlockEditProps {
    attributes: MotionContext & Record<string, any>;
    setAttributes: (attributes: Partial<MotionContext>) => void;
    clientId: string;
    name: string;
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
            motionEnabled: { 
                type: "boolean", 
                default: false,
            },
            scrollAnimationEnabled: { 
                type: "boolean", 
                default: false,
            },
            entranceAnimationType: { 
                type: "string",
                default: "fade-in"
            },
            scrollAnimationType: { 
                type: "string",
                default: "none"
            },
            motionDuration: { 
                type: "number", 
                default: 1000 
            },
            motionDelay: { 
                type: "number", 
                default: 0 
            },
            motionTimingFunction: { 
                type: "string", 
                default: "ease-out" 
            },
            motionThreshold: { 
                type: "number", 
                default: 20 
            },
            scrollCompletionPoint: { 
                type: "number", 
                default: 80 
            },
            scrollCompletionPointMobile: {
                type: "number",
                default: 50
            }
        }
    };
}

/**
 * Higher-order component that adds motion controls AND preview to blocks.
 * Uses useBlockProps with ref for direct DOM access!
 */
const withMotionControls = createHigherOrderComponent(
    (BlockEdit: ComponentType<any>) => {
        return (props: BlockEditProps) => {
            const { clientId, attributes, name, setAttributes } = props;
            
            // Only apply motion behavior when motion is explicitly enabled
            const hasMotionEnabled = attributes.motionEnabled ?? false;
            const hasScrollEnabled = attributes.scrollAnimationEnabled ?? false;
            
            // If no motion is enabled, just render the original block + controls
            if (!hasMotionEnabled && !hasScrollEnabled) {
                return (
                    <Fragment>
                        <BlockEdit {...props} />
                        <MotionBlocksEditor 
                            attributes={attributes}
                            setAttributes={setAttributes}
                        />
                    </Fragment>
                );
            }

            // Only blocks with motion actually enabled get the preview functionality
            const [blockElement, setBlockElement] = useState<HTMLDivElement | null>(null);

            // Get motion context with proper defaults
            const motionContext: MotionContext = {
                motionEnabled: attributes.motionEnabled ?? false,
                scrollAnimationEnabled: attributes.scrollAnimationEnabled ?? false,
                entranceAnimationType: attributes.entranceAnimationType,
                scrollAnimationType: attributes.scrollAnimationType,
                motionDuration: attributes.motionDuration ?? 1000,
                motionDelay: attributes.motionDelay ?? 0,
                motionTimingFunction: attributes.motionTimingFunction ?? "ease-out",
                motionThreshold: attributes.motionThreshold ?? 20,
                scrollCompletionPoint: attributes.scrollCompletionPoint ?? 90,
                scrollCompletionPointMobile: attributes.scrollCompletionPointMobile ?? 90
            };

            // Use motion preview hook ONLY for motion-enabled blocks
            useMotionPreview({
                clientId,
                blockRef: { current: blockElement },
                context: motionContext,
                enabled: hasMotionEnabled || hasScrollEnabled,
            });

            return (
                <Fragment>
                    {/* Transparent ref container - only for motion blocks */}
                    <div 
                        ref={(element) => {
                            if (element && !blockElement) {
                                // Find the actual block element (first child that's a real block)
                                const foundBlockElement = element.firstElementChild;
                                if (foundBlockElement) {
                                    setBlockElement(foundBlockElement as HTMLDivElement);
                                } else {
                                    // Fallback - use the wrapper itself
                                    console.error('No block element found...setting wrapper element for now till we have it try catch and return a error message instead gracefully so developers can resolve it');
                                    setBlockElement(element);
                                }
                            }
                        }}
                        style={{ display: 'contents' }} // !Important: Fixes image resize issue. Make wrapper transparent to layout
                    >
                        <BlockEdit {...props} />
                    </div>
                    
                    {/* Motion Controls - keep them exactly where they were */}
                    <MotionBlocksEditor 
                        attributes={attributes}
                        setAttributes={setAttributes}
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