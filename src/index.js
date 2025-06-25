/**
 * WordPress dependencies
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

// Basic animation presets
const ANIMATION_PRESETS = [
	{ label: __("None", "motion-blocks"), value: "none" },
	{ label: __("Fade In", "motion-blocks"), value: "fade-in" },
	{ label: __("Slide In Up", "motion-blocks"), value: "slide-in-up" },
	{ label: __("Slide In Down", "motion-blocks"), value: "slide-in-down" },
	{ label: __("Slide In Left", "motion-blocks"), value: "slide-in-left" },
	{ label: __("Slide In Right", "motion-blocks"), value: "slide-in-right" },
	{ label: __("Scale In", "motion-blocks"), value: "scale-in" },
	{ label: __("Blur In", "motion-blocks"), value: "blur-in" }
];

// Animation timing functions
const TIMING_FUNCTIONS = [
	{ label: __("Ease Out", "motion-blocks"), value: "ease-out" },
	{ label: __("Ease In", "motion-blocks"), value: "ease-in" },
	{ label: __("Ease In Out", "motion-blocks"), value: "ease-in-out" },
	{ label: __("Linear", "motion-blocks"), value: "linear" },
	{ label: __("Ease", "motion-blocks"), value: "ease" }
];

// Default settings for Motion Blocks
const MOTION_BLOCKS_DEFAULTS = {
	ENABLED: false,
	PRESET: "none",
	DURATION: 600,
	DELAY: 0,
	TIMING_FUNCTION: "ease-out",
	SCROLL_ENABLED: false,
	SCROLL_RANGE: 30
};

/**
 * Add motion attributes to all blocks.
 */
function addMotionAttributes(settings) {
	if (!settings.attributes) settings.attributes = {};

	settings.attributes = {
		...settings.attributes,
		motionEnabled: { type: "boolean", default: false },
		motionPreset: { type: "string", default: "none" },
		motionDuration: { type: "number", default: 600 },
		motionDelay: { type: "number", default: 0 },
		motionTimingFunction: { type: "string", default: "ease-out" },
		motionScrollEnabled: { type: "boolean", default: false },
		motionScrollRange: { type: "number", default: 30 }
	};

	return settings;
}

addFilter(
	"blocks.registerBlockType",
	"motion-blocks/add-attributes",
	addMotionAttributes
);

/**
 * Add motion controls to the block inspector.
 */
const withMotionControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
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
						initialOpen={false}>
						<ToggleControl
							label={__("Enable Animation", "motion-blocks")}
							checked={motionEnabled}
							onChange={(value) => setAttributes({ motionEnabled: value })}
						/>

						{motionEnabled && (
							<Fragment>
								<SelectControl
									label={__("Animation Effect", "motion-blocks")}
									value={motionPreset}
									options={ANIMATION_PRESETS}
									onChange={(value) => setAttributes({ motionPreset: value })}
								/>

								{motionPreset !== "none" && (
									<Fragment>
										<RangeControl
											label={__("Duration (ms)", "motion-blocks")}
											value={motionDuration}
											onChange={(value) =>
												setAttributes({ motionDuration: value })
											}
											min={200}
											max={1500}
											step={50}
										/>

										<RangeControl
											label={__("Delay (ms)", "motion-blocks")}
											value={motionDelay}
											onChange={(value) =>
												setAttributes({ motionDelay: value })
											}
											min={0}
											max={1000}
											step={50}
											help={__(
												"Delay before entrance animation.",
												"motion-blocks"
											)}
										/>

										<SelectControl
											label={__("Timing Function", "motion-blocks")}
											value={motionTimingFunction}
											options={TIMING_FUNCTIONS}
											onChange={(value) =>
												setAttributes({ motionTimingFunction: value })
											}
										/>

										<ToggleControl
											label={__("Animate on Scroll", "motion-blocks")}
											checked={motionScrollEnabled}
											onChange={(value) =>
												setAttributes({ motionScrollEnabled: value })
											}
											help={__(
												"Enable continuous animation based on scroll position. When disabled, elements only play their entrance animation once.",
												"motion-blocks"
											)}
										/>

										{motionScrollEnabled && (
											<RangeControl
												label={__("Scroll Threshold (%)", "motion-blocks")}
												value={motionScrollRange}
												onChange={(value) =>
													setAttributes({ motionScrollRange: value })
												}
												min={10}
												max={100}
												step={10}
												help={__(
													"How much of an element should be visible before scroll animation starts.",
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
											}}>
											<strong>Entry Animation:</strong> Elements play their
											entrance animation when they first become visible.
											{motionScrollEnabled && (
												<>
													<br />
													<strong>Scroll Animation:</strong> Elements animate
													progressively as they move through the viewport.
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
}, "withMotionControls");

addFilter(
	"editor.BlockEdit",
	"motion-blocks/with-controls",
	withMotionControls
);
