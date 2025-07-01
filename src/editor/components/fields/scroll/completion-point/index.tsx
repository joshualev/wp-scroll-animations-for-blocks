/**
 * Scroll Completion Point Field
 * ==============================
 * 
 * Scroll-only field for setting when animation completes in viewport.
 * Provides separate controls for Desktop and Mobile.
 */

import { RangeControl, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface ScrollCompletionPointProps {
    desktopValue: number;
    mobileValue: number;
    onChangeDesktop: (value: number) => void;
    onChangeMobile: (value: number) => void;
}

export function ScrollCompletionPoint({ desktopValue, mobileValue, onChangeDesktop, onChangeMobile }: ScrollCompletionPointProps) {
    return (
        <TabPanel
            className="motion-tab-panel"
            activeClass="is-active"
            tabs={[
                {
                    name: 'desktop',
                    title: __('Desktop', 'motion-blocks'),
                },
                {
                    name: 'mobile',
                    title: __('Mobile', 'motion-blocks'),
                },
            ]}
        >
            {(tab) => (
                <div style={{ marginTop: '16px' }}>
                    {tab.name === 'desktop' ? (
                        <RangeControl 
                            label={__("Completion Point", "motion-blocks")} 
                            value={desktopValue} 
                            onChange={(newValue) => onChangeDesktop(newValue ?? 90)} 
                            min={10} 
                            max={100} 
                            step={5}
                            help={__("Animation completes at this viewport % on desktop.", "motion-blocks")}
                            __nextHasNoMarginBottom
                        />
                    ) : (
                        <RangeControl 
                            label={__("Completion Point (Mobile)", "motion-blocks")} 
                            value={mobileValue} 
                            onChange={(newValue) => onChangeMobile(newValue ?? 90)} 
                            min={10} 
                            max={100} 
                            step={5}
                            help={__("Animation completes at this viewport % on mobile.", "motion-blocks")}
                            __nextHasNoMarginBottom
                        />
                    )}
                </div>
            )}
        </TabPanel>
    );
} 