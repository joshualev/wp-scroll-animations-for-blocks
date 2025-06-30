/**
 * Motion Blocks Editor
 * ====================
 * 
 * Clean, focused editor component for motion animations.
 * Implements all user requirements with modern UI components and fixed deprecation warnings.
 */

import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, SelectControl, RangeControl, BaseControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useCallback, useMemo, useEffect } from "@wordpress/element";

import type { MotionContext } from "@/core/types";
import { StyleSelector, AnimationVariantMenu } from "./components";
import { ENTRANCE_STYLES, SCROLL_STYLES, TIMING_FUNCTIONS, DEFAULT_TIMING_FUNCTION } from "./config/animation-data";
import { 
    parseAnimation, 
    getEntranceDirections, 
    getScrollVariants, 
    buildEntranceAnimation,
    buildScrollAnimation 
} from "./utils/animation-helpers";

import "./block-integration";
import "./editor.scss";

interface EditorProps {
    attributes: MotionContext;
    setAttributes: (attributes: Partial<MotionContext>) => void;
}

export const MotionBlocksEditor = ({ attributes, setAttributes }: EditorProps) => {
    const {
        motionEnabled = false,
        scrollAnimationEnabled = false,
        entranceAnimationType = "none",
        scrollAnimationType = "none",
        motionDuration = 1000,
        motionDelay = 0,
        motionTimingFunction = DEFAULT_TIMING_FUNCTION,
        motionThreshold = 20,
        scrollCompletionPoint = 90
    } = attributes;

    // Parse current animations to extract style and variant
    const currentEntrance = useMemo(() => parseAnimation(entranceAnimationType), [entranceAnimationType]);
    const currentScroll = useMemo(() => parseAnimation(scrollAnimationType), [scrollAnimationType]);

    // Get the active animation context
    const isScrollMode = scrollAnimationEnabled;
    const currentAnimation = isScrollMode ? currentScroll : currentEntrance;
    const currentStyle = currentAnimation.style;
    const currentVariant = currentAnimation.variant;

    // Get available variants for current style
    const availableVariants = useMemo(() => {
        if (!motionEnabled || !currentStyle) return [];
        
        return isScrollMode 
            ? getScrollVariants(currentStyle)
            : getEntranceDirections(currentStyle);
    }, [motionEnabled, currentStyle, isScrollMode]);

    // Handle style selection
    const handleStyleSelect = useCallback((style: string) => {
        if (isScrollMode) {
            const newAnimation = buildScrollAnimation(style, 'default');
            setAttributes({ scrollAnimationType: newAnimation });
        } else {
            const newAnimation = buildEntranceAnimation(style, 'default');
            setAttributes({ entranceAnimationType: newAnimation });
        }
    }, [isScrollMode, setAttributes]);

    // Handle variant selection
    const handleVariantSelect = useCallback((variant: string) => {
        if (!currentStyle) return;

        if (isScrollMode) {
            const newAnimation = buildScrollAnimation(currentStyle, variant);
            setAttributes({ scrollAnimationType: newAnimation });
        } else {
            const newAnimation = buildEntranceAnimation(currentStyle, variant);
            setAttributes({ entranceAnimationType: newAnimation });
        }
    }, [isScrollMode, currentStyle, setAttributes]);

    // Get default animations
    const getDefaultEntranceAnimation = useCallback(() => {
        const firstStyle = ENTRANCE_STYLES[0].name;
        return buildEntranceAnimation(firstStyle, 'default');
    }, []);

    const getDefaultScrollAnimation = useCallback(() => {
        const firstStyle = SCROLL_STYLES[0].name;
        return buildScrollAnimation(firstStyle, 'default');
    }, []);

    // Handle motion enable/disable
    const handleMotionToggle = useCallback((enabled: boolean) => {
        if (enabled) {
            // When enabling motion, default to entrance animation
            setAttributes({
                motionEnabled: enabled,
                scrollAnimationEnabled: false,
                entranceAnimationType: getDefaultEntranceAnimation(),
                scrollAnimationType: "none"
            });
        } else {
            // When disabling motion, turn off everything
            setAttributes({
                motionEnabled: enabled,
                scrollAnimationEnabled: false,
                entranceAnimationType: "none",
                scrollAnimationType: "none"
            });
        }
    }, [setAttributes, getDefaultEntranceAnimation]);

    // Handle animation mode toggle - switch between entrance and scroll
    const handleModeToggle = useCallback((enabled: boolean) => {
        if (enabled) {
            // Switch to scroll mode with default scroll animation
            setAttributes({
                scrollAnimationEnabled: enabled,
                entranceAnimationType: "none",
                scrollAnimationType: getDefaultScrollAnimation()
            });
        } else {
            // Switch to entrance mode with default entrance animation
            setAttributes({
                scrollAnimationEnabled: enabled,
                entranceAnimationType: getDefaultEntranceAnimation(),
                scrollAnimationType: "none"
            });
        }
    }, [setAttributes, getDefaultEntranceAnimation, getDefaultScrollAnimation]);

    // Auto-select default animations when motion is enabled but no valid animation is set
    useEffect(() => {
        if (motionEnabled) {
            if (scrollAnimationEnabled && scrollAnimationType === "none") {
                // Scroll mode but no scroll animation - auto-select default
                setAttributes({ scrollAnimationType: getDefaultScrollAnimation() });
            } else if (!scrollAnimationEnabled && entranceAnimationType === "none") {
                // Entrance mode but no entrance animation - auto-select default
                setAttributes({ entranceAnimationType: getDefaultEntranceAnimation() });
            }
        }
    }, [motionEnabled, scrollAnimationEnabled, entranceAnimationType, scrollAnimationType, 
        setAttributes, getDefaultEntranceAnimation, getDefaultScrollAnimation]);

    return (
        <InspectorControls>
            <PanelBody title={__("Motion Animation", "motion-blocks")} initialOpen={true}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    
                    <ToggleControl 
                        label={__("Enable Animation", "motion-blocks")} 
                        checked={motionEnabled} 
                        onChange={handleMotionToggle}
                        __nextHasNoMarginBottom
                    />
                    
                    {motionEnabled && (
                        <>
                            <ToggleControl 
                                label={__("Scroll-based Animation", "motion-blocks")} 
                                checked={scrollAnimationEnabled} 
                                onChange={handleModeToggle}
                                help={__("Animate with scroll position instead of entrance only.", "motion-blocks")}
                                __nextHasNoMarginBottom
                            />
                            
                            <BaseControl 
                                label={__("Animation Style", "motion-blocks")} 
                                id="animation-style"
                                __nextHasNoMarginBottom
                            >
                                <StyleSelector 
                                    styles={isScrollMode ? SCROLL_STYLES : ENTRANCE_STYLES}
                                    selectedStyle={currentStyle}
                                    onSelect={handleStyleSelect}
                                />
                            </BaseControl>
                            
                            {availableVariants.length > 0 && currentVariant && (
                                <AnimationVariantMenu
                                    value={currentVariant}
                                    variants={availableVariants}
                                    onChange={handleVariantSelect}
                                />
                            )}
                            
                            <RangeControl 
                                label={__("Threshold", "motion-blocks")} 
                                value={motionThreshold} 
                                onChange={(value) => setAttributes({ motionThreshold: value ?? 20 })} 
                                min={0} max={100} step={5}
                                help={__("Percentage of element visibility required to trigger animation.", "motion-blocks")}
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                            />
                            
                            {isScrollMode && (
                                <RangeControl 
                                    label={__("Completion Point", "motion-blocks")} 
                                    value={scrollCompletionPoint} 
                                    onChange={(value) => setAttributes({ scrollCompletionPoint: value ?? 90 })} 
                                    min={10} max={90} step={5}
                                    help={__("When in the scroll viewport should the animation complete.", "motion-blocks")}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />
                            )}
                            
                            {!isScrollMode && (
                                <>
                                    <RangeControl 
                                        label={__("Duration", "motion-blocks")} 
                                        value={motionDuration} 
                                        onChange={(value) => setAttributes({ motionDuration: value ?? 1000 })} 
                                        min={100} max={3000} step={100}
                                        help={__("How long the animation takes to complete.", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />
                                    
                                    <RangeControl 
                                        label={__("Delay", "motion-blocks")} 
                                        value={motionDelay} 
                                        onChange={(value) => setAttributes({ motionDelay: value ?? 0 })} 
                                        min={0} max={2000} step={100}
                                        help={__("Wait time before animation starts.", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />
                                    
                                    <SelectControl 
                                        label={__("Speed Curve", "motion-blocks")} 
                                        value={motionTimingFunction} 
                                        options={TIMING_FUNCTIONS} 
                                        onChange={(value) => setAttributes({ motionTimingFunction: value })}
                                        help={__("How the animation accelerates and decelerates.", "motion-blocks")}
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </PanelBody>
        </InspectorControls>
    );
}; 