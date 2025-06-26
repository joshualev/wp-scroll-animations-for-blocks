/**
 * Motion Blocks Editor Integration
 * ================================
 * Adds motion animation controls to the Gutenberg block editor.
 * Extends all blocks with motion settings via the Inspector Controls panel.
 */

import { InspectorControls } from "@wordpress/block-editor";
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import type { BlockConfiguration } from "@wordpress/blocks";
import type { ComponentType } from "react";
import { 
    ENTRANCE_ANIMATION_PRESETS,
    SCROLL_ANIMATION_PRESETS,
    type EntranceAnimationType,
    type ScrollAnimationType,
    type MotionContext,
} from "@/shared/types";

/**
 * Dropdown option for animation type selection.
 */
export interface TypeOption {
    /** Display label for the option */
    label: string;
    /** Value to store in block attributes */
    value: string;
}

/**
 * Dropdown option for timing function selection.
 */
export interface TimingFunctionOption {
    /** Display label for the option */
    label: string;
    /** CSS timing function value */
    value: string;
} 

// BlockEditProps type for editor component
interface BlockEditProps {
    attributes: MotionContext & Record<string, any>;
    setAttributes: (attributes: Partial<MotionContext>) => void;
    [key: string]: any;
}

/**
 * Helper function to format animation names for display
 */
const formatAnimationName = (name: string): string => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Editor dropdown options for entrance animation presets.
 */
const ENTRANCE_PRESET_OPTIONS: TypeOption[] = [
    { label: __("None", "motion-blocks"), value: "none" },
    ...ENTRANCE_ANIMATION_PRESETS.map((preset): TypeOption => ({
        label: __(formatAnimationName(preset), "motion-blocks"),
        value: preset
    })),
];

/**
 * Editor dropdown options for scroll animation presets.
 */
const SCROLL_PRESET_OPTIONS: TypeOption[] = [
    { label: __("None", "motion-blocks"), value: "none" },
    ...SCROLL_ANIMATION_PRESETS.map((preset): TypeOption => ({
        label: __(formatAnimationName(preset), "motion-blocks"),
        value: preset
    })),
];

/**
 * CSS timing function options for the editor dropdown.
 */
const TIMING_FUNCTION_OPTIONS: TimingFunctionOption[] = [
    { label: __("Ease Out", "motion-blocks"), value: "ease-out" },
    { label: __("Ease In", "motion-blocks"), value: "ease-in" },
    { label: __("Ease In Out", "motion-blocks"), value: "ease-in-out" },
    { label: __("Linear", "motion-blocks"), value: "linear" },
    { label: __("Ease", "motion-blocks"), value: "ease" }
];

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
            entranceAnimationType: { type: "string", default: "fade-in" },
            scrollAnimationType: { type: "string", default: "none" },
            motionDuration: { type: "number", default: 600 },
            motionDelay: { type: "number", default: 0 },
            motionTimingFunction: { type: "string", default: "ease-out" },
            motionThreshold: { type: "number", default: 30 },
            scrollAnimationEnabled: { type: "boolean", default: false },
            scrollCompletionPoint: { type: "number", default: 50 }
        }
    };
}

addFilter(
    "blocks.registerBlockType",
    "motion-blocks/add-attributes",
    addMotionAttributes
);

/**
 * Higher-order component that adds motion controls to the block inspector.
 * Wraps the original BlockEdit component with additional UI controls.
 */
const withMotionControls = createHigherOrderComponent(
    (BlockEdit: ComponentType<any>) => {
        return (props: BlockEditProps) => {
            const { attributes, setAttributes } = props;
            const {
                motionEnabled,
                entranceAnimationType,
                scrollAnimationType,
                motionDuration,
                motionDelay,
                motionTimingFunction,
                motionThreshold,
                scrollAnimationEnabled,
                scrollCompletionPoint
            } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody
                            title={__("Motion Animation", "motion-blocks")}
                            initialOpen={false}
                        >
                            <ToggleControl
                                label={__("Enable Animation", "motion-blocks")}
                                checked={motionEnabled}
                                onChange={(value: boolean) => setAttributes({ motionEnabled: value })}
                            />

                            {motionEnabled && (
                                <Fragment>
                                    {/* Animation Type Choice */}
                                    <div style={{ marginBottom: "20px" }}>
                                        <h4 style={{ margin: "0 0 12px 0" }}>
                                            {__("Animation Type", "motion-blocks")}
                                        </h4>
                                        <p style={{ fontSize: "13px", color: "#666", margin: "0 0 12px 0" }}>
                                            {__("Choose entrance animation or scroll-driven animation", "motion-blocks")}
                                        </p>

                                        <ToggleControl
                                            label={__("Use Scroll Animation", "motion-blocks")}
                                            checked={scrollAnimationEnabled}
                                            onChange={(value: boolean) => {
                                                if (value) {
                                                    // Switching to scroll - clean up entrance-specific attributes
                                                    setAttributes({ 
                                                        scrollAnimationEnabled: true,
                                                        motionDuration: 600, // Reset to default
                                                        motionDelay: 0, // Reset to default
                                                        motionTimingFunction: "ease-out" // Reset to default
                                                    });
                                                } else {
                                                    // Switching to entrance - clean up scroll-specific attributes  
                                                    setAttributes({ 
                                                        scrollAnimationEnabled: false,
                                                        scrollAnimationType: "none" // Reset scroll type
                                                    });
                                                }
                                            }}
                                            help={scrollAnimationEnabled 
                                                ? __("Animates continuously with scroll position", "motion-blocks")
                                                : __("Use entrance animation (plays once when visible)", "motion-blocks")
                                            }
                                        />
                                    </div>

                                    {/* Entrance Animation Section */}
                                    {!scrollAnimationEnabled && (
                                        <div style={{ marginBottom: "20px", padding: "12px", background: "#f0f8ff", borderRadius: "4px" }}>
                                            <h4 style={{ margin: "0 0 12px 0", color: "#0073aa" }}>
                                                {__("Entrance Animation", "motion-blocks")}
                                            </h4>
                                            <SelectControl
                                                label={__("Animation Type", "motion-blocks")}
                                                value={entranceAnimationType}
                                                options={ENTRANCE_PRESET_OPTIONS}
                                                onChange={(value: string) => setAttributes({ 
                                                    entranceAnimationType: value as EntranceAnimationType | "none"
                                                })}
                                                help={__("Plays when element first becomes visible", "motion-blocks")}
                                            />
                                        </div>
                                    )}

                                    {/* Universal Threshold Control for Both Animation Types */}
                                    <div style={{ marginBottom: "20px", padding: "12px", background: "#f8f9fa", borderRadius: "4px" }}>
                                        <h4 style={{ margin: "0 0 12px 0" }}>
                                            {__("Animation Settings", "motion-blocks")}
                                        </h4>
                                        <RangeControl
                                            label={__("Visibility Threshold (%)", "motion-blocks")}
                                            value={motionThreshold}
                                            onChange={(value?: number) =>
                                                value !== undefined && setAttributes({ motionThreshold: value })
                                            }
                                            min={10}
                                            max={100}
                                            step={10}
                                            help={scrollAnimationEnabled
                                                ? __("Percentage of element visibility required before scroll animation activates.", "motion-blocks")
                                                : __("Percentage of element visibility required before entrance animation triggers.", "motion-blocks")
                                            }
                                        />
                                    </div>

                                    {/* Scroll Animation Section */}
                                    {scrollAnimationEnabled && (
                                        <div style={{ marginBottom: "20px", padding: "12px", background: "#f0fff0", borderRadius: "4px" }}>
                                            <h4 style={{ margin: "0 0 12px 0", color: "#00a32a" }}>
                                                {__("Scroll Animation", "motion-blocks")}
                                            </h4>
                                            <SelectControl
                                                label={__("Animation Type", "motion-blocks")}
                                                value={scrollAnimationType}
                                                options={SCROLL_PRESET_OPTIONS}
                                                onChange={(value: string) => setAttributes({ 
                                                    scrollAnimationType: value as ScrollAnimationType | "none"
                                                })}
                                                help={__("Animates based on scroll position using ViewTimeline API", "motion-blocks")}
                                            />
                                            
                                            <div style={{ marginTop: "12px" }}>
                                                <RangeControl
                                                    label={__("Animation Completion Point (%)", "motion-blocks")}
                                                    value={scrollCompletionPoint}
                                                    onChange={(value?: number) =>
                                                        value !== undefined && setAttributes({ scrollCompletionPoint: value })
                                                    }
                                                    min={10}
                                                    max={90}
                                                    step={10}
                                                    help={__("At what percentage of viewport scroll should the animation complete? Lower values = animation finishes earlier in scroll, higher values = finishes later.", "motion-blocks")}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Timing Controls (only for entrance animations) */}
                                    {!scrollAnimationEnabled && entranceAnimationType !== "none" && (
                                        <div style={{ marginBottom: "20px", padding: "12px", background: "#f8f9fa", borderRadius: "4px" }}>
                                            <h4 style={{ margin: "0 0 12px 0" }}>
                                                {__("Timing Settings", "motion-blocks")}
                                            </h4>
                                            
                                            <RangeControl
                                                label={__("Duration (ms)", "motion-blocks")}
                                                value={motionDuration}
                                                onChange={(value?: number) => {
                                                    if (value !== undefined) {
                                                        setAttributes({ motionDuration: value });
                                                    }
                                                }}
                                                min={200}
                                                max={1500}
                                                step={50}
                                            />

                                            <RangeControl
                                                label={__("Delay (ms)", "motion-blocks")}
                                                value={motionDelay}
                                                onChange={(value?: number) =>
                                                    value !== undefined && setAttributes({ motionDelay: value })
                                                }
                                                min={0}
                                                max={1000}
                                                step={50}
                                                help={__(
                                                    "Delay before animation starts.",
                                                    "motion-blocks"
                                                )}
                                            />

                                            <SelectControl
                                                label={__("Timing Function", "motion-blocks")}
                                                value={motionTimingFunction}
                                                options={TIMING_FUNCTION_OPTIONS}
                                                onChange={(value: string) =>
                                                    setAttributes({ motionTimingFunction: value })
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* Help Text */}
                                    <div
                                        style={{
                                            fontStyle: "italic",
                                            color: "#666",
                                            fontSize: "13px",
                                            marginTop: "16px",
                                            padding: "12px",
                                            background: "#f8f9fa",
                                            borderRadius: "4px"
                                        }}
                                    >
                                        <strong>{__("How it works:", "motion-blocks")}</strong>
                                        <br />
                                        {!scrollAnimationEnabled ? (
                                            <>
                                                • <strong>{__("Entrance:", "motion-blocks")}</strong> {__("Plays once when element becomes visible", "motion-blocks")}
                                            </>
                                        ) : (
                                            <>
                                                • <strong>{__("Scroll:", "motion-blocks")}</strong> {__("Animates continuously with scroll position", "motion-blocks")}
                                            </>
                                        )}
                                    </div>
                                </Fragment>
                            )}
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    },
    "withMotionControls"
);

addFilter(
    "editor.BlockEdit",
    "motion-blocks/with-controls",
    withMotionControls
); 