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
    ANIMATION_PRESETS, 
    type AnimationPresetValue, 
    type MotionContext,
    type PresetOption,
    type TimingFunctionOption
} from "./types";

// BlockEditProps type for editor component
interface BlockEditProps {
    attributes: MotionContext & Record<string, any>;
    setAttributes: (attributes: Partial<MotionContext>) => void;
    [key: string]: any;
}

/**
 * Editor dropdown options for animation presets.
 */
const PRESET_OPTIONS: PresetOption[] = [
    { label: __("None", "motion-blocks"), value: "none" },
    ...ANIMATION_PRESETS.map((preset): PresetOption => ({
        label: __(preset.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), "motion-blocks"),
        value: preset
    }))
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
            motionPreset: { type: "string", default: "none" },
            motionDuration: { type: "number", default: 600 },
            motionDelay: { type: "number", default: 0 },
            motionTimingFunction: { type: "string", default: "ease-out" },
            motionScrollEnabled: { type: "boolean", default: false },
            motionScrollRange: { type: "number", default: 30 }
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
                motionPreset,
                motionDuration,
                motionDelay,
                motionTimingFunction,
                motionScrollEnabled,
                motionScrollRange
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
                                    <SelectControl
                                        label={__("Animation Effect", "motion-blocks")}
                                        value={motionPreset}
                                        options={PRESET_OPTIONS}
                                        onChange={(value: string) => setAttributes({ 
                                            motionPreset: value as AnimationPresetValue | "none" 
                                        })}
                                    />

                                    {motionPreset !== "none" && (
                                        <Fragment>
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
                                                    "Delay before entrance animation starts.",
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

                                            <ToggleControl
                                                label={__("Animate on Scroll", "motion-blocks")}
                                                checked={motionScrollEnabled}
                                                onChange={(value: boolean) =>
                                                    setAttributes({ motionScrollEnabled: value })
                                                }
                                                help={__(
                                                    "Enable scroll-driven animation after entrance animation completes.",
                                                    "motion-blocks"
                                                )}
                                            />

                                            {motionScrollEnabled && (
                                                <RangeControl
                                                    label={__("Scroll Threshold (%)", "motion-blocks")}
                                                    value={motionScrollRange}
                                                    onChange={(value?: number) =>
                                                        value !== undefined && setAttributes({ motionScrollRange: value })
                                                    }
                                                    min={10}
                                                    max={100}
                                                    step={10}
                                                    help={__(
                                                        "Percentage of element visibility required before scroll animation activates.",
                                                        "motion-blocks"
                                                    )}
                                                />
                                            )}

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
                                                <strong>Entry Animation:</strong> Plays once when element
                                                first becomes visible.
                                                {motionScrollEnabled && (
                                                    <>
                                                        <br />
                                                        <strong>Scroll Animation:</strong> Continues animating
                                                        based on scroll position using ViewTimeline API.
                                                    </>
                                                )}
                                            </div>
                                        </Fragment>
                                    )}
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