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

/**
 * Add motion attributes to all blocks.
 */
function addMotionAttributes(settings) {
	// Skip if block doesn't support custom attributes
	if (!settings.attributes) {
		settings.attributes = {};
	}

	settings.attributes = {
		...settings.attributes,
		motionEnabled: {
			type: "boolean",
			default: false
		},
		motionPreset: {
			type: "string",
			default: "fade"
		},
		motionDelay: {
			type: "number",
			default: 0
		},
		motionDuration: {
			type: "number",
			default: 600
		},
		motionEasing: {
			type: "string",
			default: "ease-out"
		},
		motionStartThreshold: {
			type: "number",
			default: 0.1
		},
		motionEndThreshold: {
			type: "number",
			default: 0.9
		},

		motionPlayOnce: {
			type: "boolean",
			default: false
		}
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
			motionDelay,
			motionDuration,
			motionEasing,
			motionStartThreshold,
			motionEndThreshold,
			motionPlayOnce
		} = attributes;

		const presetOptions = [
			{ label: __("Fade", "motion-blocks"), value: "fade" },
			{ label: __("Slide Up", "motion-blocks"), value: "slide-up" },
			{ label: __("Slide Down", "motion-blocks"), value: "slide-down" },
			{ label: __("Slide Left", "motion-blocks"), value: "slide-left" },
			{
				label: __("Slide Right", "motion-blocks"),
				value: "slide-right"
			},
			{ label: __("Zoom In", "motion-blocks"), value: "zoom-in" },
			{ label: __("Zoom Out", "motion-blocks"), value: "zoom-out" },
			{ label: __("Rotate", "motion-blocks"), value: "rotate" },
			{ label: __("Flip X", "motion-blocks"), value: "flip-x" },
			{ label: __("Flip Y", "motion-blocks"), value: "flip-y" },
			{ label: __("Blur", "motion-blocks"), value: "blur" }
		];

		const easingOptions = [
			{ label: __("Ease", "motion-blocks"), value: "ease" },
			{ label: __("Ease In", "motion-blocks"), value: "ease-in" },
			{ label: __("Ease Out", "motion-blocks"), value: "ease-out" },
			{
				label: __("Ease In Out", "motion-blocks"),
				value: "ease-in-out"
			},
			{ label: __("Linear", "motion-blocks"), value: "linear" }
		];

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Motion", "motion-blocks")} initialOpen={false}>
						<ToggleControl
							label={__("Enable Motion", "motion-blocks")}
							checked={motionEnabled}
							onChange={(value) => setAttributes({ motionEnabled: value })}
						/>

						{motionEnabled && (
							<Fragment>
								<SelectControl
									label={__("Animation Preset", "motion-blocks")}
									value={motionPreset}
									options={presetOptions}
									onChange={(value) => setAttributes({ motionPreset: value })}
								/>

								<RangeControl
									label={__("Delay (ms)", "motion-blocks")}
									value={motionDelay}
									onChange={(value) => setAttributes({ motionDelay: value })}
									min={0}
									max={2000}
									step={100}
								/>

								<RangeControl
									label={__("Duration (ms)", "motion-blocks")}
									value={motionDuration}
									onChange={(value) =>
										setAttributes({
											motionDuration: value
										})
									}
									min={100}
									max={3000}
									step={100}
								/>

								<SelectControl
									label={__("Easing", "motion-blocks")}
									value={motionEasing}
									options={easingOptions}
									onChange={(value) => setAttributes({ motionEasing: value })}
								/>

								<RangeControl
									label={__("Start Threshold", "motion-blocks")}
									value={motionStartThreshold}
									onChange={(value) =>
										setAttributes({
											motionStartThreshold: value
										})
									}
									min={0}
									max={1}
									step={0.1}
								/>

								<RangeControl
									label={__("End Threshold", "motion-blocks")}
									value={motionEndThreshold}
									onChange={(value) =>
										setAttributes({
											motionEndThreshold: value
										})
									}
									min={0}
									max={1}
									step={0.1}
								/>

								<ToggleControl
									label={__("Play Once", "motion-blocks")}
									checked={motionPlayOnce}
									onChange={(value) =>
										setAttributes({
											motionPlayOnce: value
										})
									}
								/>
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

/**
 * Add motion data attributes to block wrapper.
 */
function addMotionProps(props, blockType, attributes) {
	const { motionEnabled } = attributes;

	if (motionEnabled) {
		return {
			...props,
			"data-motion-enabled": "true",
			"data-motion-preset": attributes.motionPreset,
			"data-motion-delay": attributes.motionDelay,
			"data-motion-duration": attributes.motionDuration,
			"data-motion-easing": attributes.motionEasing,
			"data-motion-start-threshold": attributes.motionStartThreshold,
			"data-motion-end-threshold": attributes.motionEndThreshold,
			"data-motion-play-once": attributes.motionPlayOnce
		};
	}

	return props;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"motion-blocks/add-props",
	addMotionProps
);
