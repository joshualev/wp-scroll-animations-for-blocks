import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	ANIMATION_DIRECTIONS,
	ANIMATION_TYPES,
	DEFAULT_SETTINGS
} from "./constants";
import "./style.css";

const withScrollAnimation = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!props.isSelected) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const {
			scrollAnimationEnabled = DEFAULT_SETTINGS.ENABLED,
			scrollAnimationType = DEFAULT_SETTINGS.TYPE,
			scrollAnimationDirection = DEFAULT_SETTINGS.DIRECTION,
			scrollAnimationThreshold = DEFAULT_SETTINGS.THRESHOLD,
			scrollAnimationDuration = DEFAULT_SETTINGS.DURATION,
			scrollAnimationDelay = DEFAULT_SETTINGS.DELAY,
			scrollAnimationRepeat = DEFAULT_SETTINGS.REPEAT
		} = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__("Scroll Animation", "scroll-animations")}
						initialOpen={false}>
						<ToggleControl
							label={__("Enable Scroll Animation", "scroll-animations")}
							checked={scrollAnimationEnabled}
							onChange={(value) =>
								setAttributes({ scrollAnimationEnabled: value })
							}
						/>
						{scrollAnimationEnabled && (
							<div className='scroll-animation-controls'>
								<SelectControl
									label={__("Animation Type", "scroll-animations")}
									value={scrollAnimationType}
									options={[
										{
											label: __("Fade", "scroll-animations"),
											value: ANIMATION_TYPES.FADE
										},
										{
											label: __("Slide", "scroll-animations"),
											value: ANIMATION_TYPES.SLIDE
										},
										{
											label: __("Spring", "scroll-animations"),
											value: ANIMATION_TYPES.SPRING
										}
									]}
									onChange={(value) =>
										setAttributes({ scrollAnimationType: value })
									}
								/>
								{scrollAnimationType === ANIMATION_TYPES.SLIDE && (
									<SelectControl
										label={__("Direction", "scroll-animations")}
										value={scrollAnimationDirection}
										options={[
											{
												label: __("Center", "scroll-animations"),
												value: ANIMATION_DIRECTIONS.CENTER
											},
											{
												label: __("Up", "scroll-animations"),
												value: ANIMATION_DIRECTIONS.UP
											},
											{
												label: __("Down", "scroll-animations"),
												value: ANIMATION_DIRECTIONS.DOWN
											},
											{
												label: __("Left", "scroll-animations"),
												value: ANIMATION_DIRECTIONS.LEFT
											},
											{
												label: __("Right", "scroll-animations"),
												value: ANIMATION_DIRECTIONS.RIGHT
											}
										]}
										onChange={(value) =>
											setAttributes({ scrollAnimationDirection: value })
										}
									/>
								)}
								<ToggleControl
									label={__("Repeat Animation", "scroll-animations")}
									help={__(
										"Enable to trigger animation every time element enters viewport",
										"scroll-animations"
									)}
									checked={scrollAnimationRepeat}
									onChange={(value) =>
										setAttributes({ scrollAnimationRepeat: value })
									}
								/>
								<RangeControl
									label={__("Threshold", "scroll-animations")}
									value={scrollAnimationThreshold}
									onChange={(value) =>
										setAttributes({ scrollAnimationThreshold: value })
									}
									min={0}
									max={1}
									step={0.1}
								/>
								<RangeControl
									label={__("Duration (ms)", "scroll-animations")}
									value={scrollAnimationDuration}
									onChange={(value) =>
										setAttributes({ scrollAnimationDuration: value })
									}
									min={0}
									max={5000}
									step={100}
								/>
								<RangeControl
									label={__("Delay (ms)", "scroll-animations")}
									value={scrollAnimationDelay}
									onChange={(value) =>
										setAttributes({ scrollAnimationDelay: value })
									}
									min={0}
									max={5000}
									step={100}
								/>
							</div>
						)}
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, "withScrollAnimation");

addFilter(
	"editor.BlockEdit",
	"scroll-animations/with-scroll-animation",
	withScrollAnimation
);

addFilter(
	"blocks.registerBlockType",
	"scroll-animations/add-attributes",
	(settings, name) => {
		if (!settings.attributes) {
			settings.attributes = {};
		}

		settings.attributes.scrollAnimationEnabled = {
			type: "boolean",
			default: DEFAULT_SETTINGS.ENABLED
		};

		settings.attributes.scrollAnimationType = {
			type: "string",
			default: DEFAULT_SETTINGS.TYPE
		};

		settings.attributes.scrollAnimationDirection = {
			type: "string",
			default: DEFAULT_SETTINGS.DIRECTION
		};

		settings.attributes.scrollAnimationThreshold = {
			type: "number",
			default: DEFAULT_SETTINGS.THRESHOLD
		};

		settings.attributes.scrollAnimationDuration = {
			type: "number",
			default: DEFAULT_SETTINGS.DURATION
		};

		settings.attributes.scrollAnimationDelay = {
			type: "number",
			default: DEFAULT_SETTINGS.DELAY
		};

		settings.attributes.scrollAnimationRepeat = {
			type: "boolean",
			default: DEFAULT_SETTINGS.REPEAT
		};

		return settings;
	}
);
