/**
 * Animation Controls
 * ==================
 * 
 * Main animation control panel for Motion Blocks.
 * Orchestrates individual field components.
 */

import { PanelBody, PanelRow, BaseControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import type { MotionContext } from "@/core/types";
import { useAnimationEditor } from "../hooks";
import {
    AnimationDirection,
    AnimationType,
    MotionToggle,
    VisibilityThreshold,
    AnimationDuration,
    AnimationDelay,
    AnimationTimingFunction,
    ScrollCompletionPoint,
    AnimationMode
} from "./fields";

interface AnimationControlsProps {
    attributes: MotionContext;
    setAttributes: (attributes: Partial<MotionContext>) => void;
}

export function AnimationControls({ attributes, setAttributes }: AnimationControlsProps) {
    const {
        isEnabled,
        isScrollMode,
        animationState,
        animationTypeOptions,
        toggleMotion,
        toggleAnimationMode,
        selectAnimationType,
        selectAnimationDirection,
        updateSetting
    } = useAnimationEditor({ attributes, setAttributes });

    const {
        scrollCompletionPoint = 90,
        scrollCompletionPointMobile = 90,
        motionThreshold: visibilityThreshold = 20,
        motionDuration: duration = 1000,
        motionDelay: delay = 0,
        motionTimingFunction: timingFunction = "ease-out"
    } = attributes;

    return (
        <PanelBody title={__("Motion", "motion-blocks")} initialOpen={true}>
            <MotionToggle 
                checked={isEnabled} 
                onChange={toggleMotion} 
            />

            {isEnabled && (
                <>
                    <AnimationMode 
                        checked={isScrollMode}
                        onChange={toggleAnimationMode}
                    />
                    
                    <BaseControl
                        label={__("Animation Type", "motion-blocks")}
                        __nextHasNoMarginBottom
                    >
                        <AnimationType 
                            animationTypes={animationTypeOptions}
                            selectedAnimationType={animationState.currentAnimationType}
                            onSelect={selectAnimationType}
                        />
                    </BaseControl>

                    {animationState.availableAnimationDirections.length > 0 && animationState.currentAnimationDirection && (
                        <AnimationDirection 
                            value={animationState.currentAnimationDirection}
                            variants={animationState.availableAnimationDirections}
                            onChange={selectAnimationDirection}
                        />
                    )}

                    <VisibilityThreshold 
                        value={visibilityThreshold} 
                        onChange={(value) => updateSetting('motionThreshold', value)} 
                    />
                    
                    {isScrollMode ? (
                        <PanelRow>
                            <ScrollCompletionPoint 
                                desktopValue={scrollCompletionPoint}
                                mobileValue={scrollCompletionPointMobile}
                                onChangeDesktop={(value) => updateSetting('scrollCompletionPoint', value)}
                                onChangeMobile={(value) => updateSetting('scrollCompletionPointMobile', value)}
                            />
                        </PanelRow>
                    ) : (
                        <>
                            <PanelRow>
                                <AnimationDuration 
                                    value={duration}
                                    onChange={(value) => updateSetting('motionDuration', value)}
                                />
                                
                                <AnimationDelay 
                                    value={delay}
                                    onChange={(value) => updateSetting('motionDelay', value)}
                                />
                                
                                <AnimationTimingFunction 
                                    value={timingFunction}
                                    onChange={(value) => updateSetting('motionTimingFunction', value)}
                                />
                            </PanelRow>
                        </>
                    )}
                </>
            )}
        </PanelBody>
    );
} 