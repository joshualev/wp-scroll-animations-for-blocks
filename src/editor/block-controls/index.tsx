/**
 * Motion Blocks Integration
 * =========================
 * 
 * WordPress block editor integration for Motion Blocks animation controls.
 * Provides a clean, minimal architecture with direct attribute manipulation.
 * 
 * Architecture:
 * - Extends all blocks with motion attributes (mb_ prefixed)
 * - Wraps blocks with Higher-Order Component for motion controls
 * - Provides animation preview functionality for enabled blocks
 * - Uses direct WordPress attribute manipulation (no complex state layers)
 */

import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment, useState } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { InspectorControls } from "@wordpress/block-editor";
import { 
    PanelBody, 
    BaseControl, 
    ToggleControl, 
    SelectControl, 
    RangeControl, 
    Button,
    __experimentalGrid as Grid 
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import type { BlockConfiguration } from "@wordpress/blocks";
import type { MotionBlockContext } from "@/core/types";
import type { AnimationType } from "@/core/animations/keyframes";

import { useMotionPreview } from "./hooks/use-motion-preview";
import { 
    getAnimationTypes, 
    getAnimationDirections, 
    resolveAnimationType, 
    getDefaultAnimationDirection 
} from "./adapters/core-data-bridge";

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Default values for motion block attributes
 */
const MOTION_DEFAULTS = {
    motionEnabled: false,
    scrollAnimationEnabled: false,
    animationType: 'fade-in' as const,
    duration: 1000,
    delay: 0,
    speedCurve: 'ease-out' as const,
    threshold: 20,
    scrollCompletionPoint: 50,
} as const;

/**
 * Range control configurations for numeric inputs
 */
const CONTROL_RANGES = {
    threshold: { min: 0, max: 100, step: 5 },
    duration: { min: 100, max: 3000, step: 100 },
    delay: { min: 0, max: 2000, step: 100 },
    scrollCompletion: { min: 10, max: 100, step: 5 }
} as const;

/**
 * Animation timing function options for entrance animations
 */
const TIMING_OPTIONS = [
    { label: 'Linear', value: 'linear' },
    { label: 'Ease', value: 'ease' },
    { label: 'Ease In', value: 'ease-in' },
    { label: 'Ease Out', value: 'ease-out' },
    { label: 'Ease In Out', value: 'ease-in-out' }
];

// ============================================================================
// TYPES
// ============================================================================

/**
 * WordPress BlockEdit component props with motion attributes
 */
interface MotionBlockEditProps {
    attributes: MotionBlockContext & Record<string, any>;
    setAttributes: (attributes: Partial<MotionBlockContext>) => void;
    clientId: string;
    name: string;
    [key: string]: any;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Creates motion context from block attributes
 */
function createMotionContext(attributes: MotionBlockContext): MotionBlockContext {
    return {
        mb_motionEnabled: attributes.mb_motionEnabled,
        mb_scrollAnimationEnabled: attributes.mb_scrollAnimationEnabled,
        mb_animationType: attributes.mb_animationType,
        mb_duration: attributes.mb_duration,
        mb_delay: attributes.mb_delay,
        mb_speedCurve: attributes.mb_speedCurve,
        mb_threshold: attributes.mb_threshold,
        mb_scrollCompletionPoint: attributes.mb_scrollCompletionPoint,
    };
}

/**
 * Processes animation options for UI display
 */
function getAnimationOptions(animationType: string) {
    const animationTypes = getAnimationTypes().map(type => ({
        name: type,
        label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
    }));

    const currentGroup = resolveAnimationType(animationType);
    const directions = currentGroup ? getAnimationDirections(currentGroup) : [];

    return { animationTypes, currentGroup, directions };
}

/**
 * Extracts block element for preview functionality
 */
function extractBlockElement(
    wrapperElement: HTMLDivElement | null, 
    setBlockElement: (element: HTMLDivElement | null) => void
) {
    // Handle React ref cleanup (element can be null when unmounting)
    if (!wrapperElement) {
        setBlockElement(null);
        return;
    }
    
    const blockElement = wrapperElement.firstElementChild;
    if (blockElement && blockElement.classList.contains('wp-block')) {
        setBlockElement(blockElement as HTMLDivElement);
    } else {
        // Graceful fallback with helpful error logging
        console.warn('Motion Blocks: Unable to find wp-block element in wrapper. Block may be empty or have unusual structure.');
        setBlockElement(null);
    }
}

// ============================================================================
// BLOCK ATTRIBUTES EXTENSION
// ============================================================================

/**
 * Extends WordPress block configurations with motion animation attributes.
 * 
 * Adds mb_ prefixed attributes to prevent conflicts with core attributes.
 * Uses sensible defaults for all motion-related properties.
 */
function addMotionAttributes(blockSettings: BlockConfiguration): BlockConfiguration {
    const existingAttributes = blockSettings.attributes || {};

    return {
        ...blockSettings,
        attributes: {
            ...existingAttributes,
            // Motion state controls
            mb_motionEnabled: { 
                type: "boolean", 
                default: MOTION_DEFAULTS.motionEnabled,
            },
            mb_scrollAnimationEnabled: { 
                type: "boolean", 
                default: MOTION_DEFAULTS.scrollAnimationEnabled,
            },
            // Animation configuration
            mb_animationType: { 
                type: "string",
                default: MOTION_DEFAULTS.animationType
            },
            // Timing controls (entrance animations only)
            mb_duration: { 
                type: "number", 
                default: MOTION_DEFAULTS.duration
            },
            mb_delay: { 
                type: "number", 
                default: MOTION_DEFAULTS.delay
            },
            mb_speedCurve: { 
                type: "string", 
                default: MOTION_DEFAULTS.speedCurve
            },
            // Visibility and scroll controls
            mb_threshold: { 
                type: "number", 
                default: MOTION_DEFAULTS.threshold
            },
            mb_scrollCompletionPoint: { 
                type: "number", 
                default: MOTION_DEFAULTS.scrollCompletionPoint
            },
        }
    };
}

// ============================================================================
// MOTION CONTROLS COMPONENT
// ============================================================================

/**
 * Higher-Order Component that enhances blocks with motion controls and preview.
 * 
 * Features:
 * - Adds Motion Blocks panel to InspectorControls for all blocks
 * - Enables live animation preview for motion-enabled blocks
 * - Uses direct WordPress attribute manipulation (no complex state management)
 * - Safely handles block element extraction with error handling
 * 
 * Performance:
 * - Preview wrapper only rendered when motion is enabled
 * - Animation options computed on-demand without memoization overhead
 * - Early exits for disabled motion to minimize performance impact
 */
const withMotionControls = createHigherOrderComponent(
    (BlockEdit) => {
        return (props: MotionBlockEditProps) => {
            const { clientId, attributes, setAttributes } = props;
            
            // Block element state for preview functionality
            const [blockElement, setBlockElement] = useState<HTMLDivElement | null>(null);
            
            // Determine if any motion features are enabled
            const hasMotionEnabled = attributes.mb_motionEnabled || attributes.mb_scrollAnimationEnabled;
            
            // Create motion context for preview hook
            const motionContext = createMotionContext(attributes);
            
            // Initialize motion preview functionality for enabled blocks
            useMotionPreview({
                clientId,
                blockRef: { current: blockElement },
                context: motionContext,
                enabled: hasMotionEnabled,
            });
            
            // Process animation options for UI
            const { animationTypes, currentGroup, directions } = getAnimationOptions(attributes.mb_animationType);
            
            // Direct attribute setters
            const setMotionEnabled = (enabled: boolean) => {
                setAttributes({ mb_motionEnabled: enabled });
            };
            const setScrollEnabled = (enabled: boolean) => {
                setAttributes({ mb_scrollAnimationEnabled: enabled });
            };
            const setAnimationType = (type: AnimationType) => {
                setAttributes({ mb_animationType: type });
            };
            const setAnimationGroup = (groupName: string) => {
                // When selecting a group, set the first animation in that group
                const defaultAnimation = getDefaultAnimationDirection(groupName);
                if (defaultAnimation) {
                    setAttributes({ mb_animationType: defaultAnimation });
                }
            };
            const setDuration = (value: number) => {
                setAttributes({ mb_duration: value });
            };
            const setDelay = (value: number) => {
                setAttributes({ mb_delay: value });
            };
            const setSpeedCurve = (value: string) => {
                setAttributes({ mb_speedCurve: value });
            };
            const setThreshold = (value: number) => {
                setAttributes({ mb_threshold: value });
            };
            const setScrollCompletion = (value: number) => {
                setAttributes({ mb_scrollCompletionPoint: value });
            };

            return (
                <Fragment>
                    {/* Conditional motion wrapper for preview functionality */}
                    {hasMotionEnabled ? (
                        <div 
                            ref={(element: HTMLDivElement | null) => extractBlockElement(element, setBlockElement)}
                            style={{ display: 'contents' }} // Transparent to layout - fixes image resize issues
                        >
                            <BlockEdit {...props} />
                        </div>
                    ) : (
                        <BlockEdit {...props} />
                    )}
                    
                    {/* Motion Controls Panel */}
                    <InspectorControls>
                        <PanelBody 
                            title={__("Motion Blocks", "motion-blocks")} 
                            initialOpen={false}
                        >
                            {/* Primary Motion Toggle */}
                            <ToggleControl 
                                label={__("Enable Animation", "motion-blocks")} 
                                checked={attributes.mb_motionEnabled}
                                onChange={setMotionEnabled}
                                __nextHasNoMarginBottom
                            />

                            {/* Show advanced controls only when motion is enabled */}
                            {attributes.mb_motionEnabled && (
                                <>
                                    {/* Animation Mode Selection */}
                                    <ToggleControl 
                                        label={__("Scroll-based Animation", "motion-blocks")} 
                                        checked={attributes.mb_scrollAnimationEnabled}
                                        onChange={setScrollEnabled}
                                        help={__("Animate with scroll position instead of entrance only.", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                    />
                                    
                                    {/* Animation Type Grid Selector */}
                                    <BaseControl
                                        label={__("Animation Type", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                    >
                                        <Grid columns={3} gap={2}>
                                            {animationTypes.map((animationType) => (
                                                <Button
                                                    key={animationType.name}
                                                    variant={currentGroup === animationType.name ? "primary" : "secondary"}
                                                    onClick={() => setAnimationGroup(animationType.name)}
                                                    className="motion-animation-type-button"
                                                    style={{
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center', 
                                                        height: '100%'
                                                    }}
                                                >
                                                    {animationType.label}
                                                </Button>
                                            ))}
                                        </Grid>
                                    </BaseControl>

                                    {/* Animation Direction Dropdown */}
                                    {directions.length > 0 && (
                                        <SelectControl
                                            label={__("Animation Direction", "motion-blocks")}
                                            value={attributes.mb_animationType}
                                            options={directions.map(direction => ({
                                                label: direction.charAt(0).toUpperCase() + direction.slice(1).replace('-', ' '),
                                                value: direction
                                            }))}
                                            onChange={(value) => setAnimationType(value as AnimationType)}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    )}

                                    {/* Visibility Threshold Control */}
                                    <RangeControl 
                                        label={__("Visibility Threshold", "motion-blocks")} 
                                        value={attributes.mb_threshold} 
                                        onChange={(value) => setThreshold(value ?? CONTROL_RANGES.threshold.min + 20)} 
                                        min={CONTROL_RANGES.threshold.min} 
                                        max={CONTROL_RANGES.threshold.max} 
                                        step={CONTROL_RANGES.threshold.step}
                                        help={__("Percentage of element visibility required to trigger animation.", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />

                                    {/* Entrance Animation Timing Controls */}
                                    {!attributes.mb_scrollAnimationEnabled && (
                                        <>
                                            <RangeControl 
                                                label={__("Animation Duration", "motion-blocks")} 
                                                value={attributes.mb_duration}
                                                onChange={(value) => setDuration(value ?? CONTROL_RANGES.duration.min + 900)} 
                                                min={CONTROL_RANGES.duration.min} 
                                                max={CONTROL_RANGES.duration.max} 
                                                step={CONTROL_RANGES.duration.step}
                                                help={__("How long the animation takes to complete.", "motion-blocks")}
                                                __nextHasNoMarginBottom
                                                __next40pxDefaultSize
                                            />
                                            
                                            <RangeControl 
                                                label={__("Animation Delay", "motion-blocks")} 
                                                value={attributes.mb_delay}
                                                onChange={(value) => setDelay(value ?? CONTROL_RANGES.delay.min)} 
                                                min={CONTROL_RANGES.delay.min} 
                                                max={CONTROL_RANGES.delay.max} 
                                                step={CONTROL_RANGES.delay.step}
                                                help={__("How long to wait before starting the animation.", "motion-blocks")}
                                                __nextHasNoMarginBottom
                                                __next40pxDefaultSize
                                            />
                                            
                                            <SelectControl 
                                                label={__("Speed Curve", "motion-blocks")} 
                                                value={attributes.mb_speedCurve} 
                                                options={TIMING_OPTIONS} 
                                                onChange={setSpeedCurve}
                                                help={__("How the animation accelerates and decelerates.", "motion-blocks")}
                                                __nextHasNoMarginBottom
                                                __next40pxDefaultSize
                                            />
                                        </>
                                    )}

                                    {/* Scroll Animation Controls */}
                                    {attributes.mb_scrollAnimationEnabled && (
                                        <RangeControl 
                                            label={__("Scroll Completion Point", "motion-blocks")} 
                                            value={attributes.mb_scrollCompletionPoint} 
                                            onChange={(value) => setScrollCompletion(value ?? CONTROL_RANGES.scrollCompletion.max - 10)} 
                                            min={CONTROL_RANGES.scrollCompletion.min} 
                                            max={CONTROL_RANGES.scrollCompletion.max} 
                                            step={CONTROL_RANGES.scrollCompletion.step}
                                            help={__("Animation completes at this viewport percentage.", "motion-blocks")}
                                            __nextHasNoMarginBottom
                                            __next40pxDefaultSize
                                        />
                                    )}
                                </>
                            )}
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    },
    "withMotionControls"
);

// ============================================================================
// WORDPRESS INTEGRATION
// ============================================================================

// Register motion attributes with all WordPress blocks
addFilter("blocks.registerBlockType", "motion-blocks/add-attributes", addMotionAttributes);

// Apply motion controls HOC to all block editors
addFilter("editor.BlockEdit", "motion-blocks/with-controls", withMotionControls);