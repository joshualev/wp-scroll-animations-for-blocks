/**
 * Motion Blocks Frontend Script (TypeScript)
 * --------------------------------------------------
 * Uses the Web Animations API together with the modern
 * ViewTimeline scroll-driven API. There are no JavaScript
 * scroll fallbacks – if the browser does not support the
 * spec we simply do not animate, keeping the code small and
 * predictable.
 */

import { getContext, getElement, store } from "@wordpress/interactivity";
import "./style.scss";
import { createEntranceAnimation, createScrollAnimation, onAnimationFinish } from "./animations";
import { prefersReducedMotion, isElementFullyVisible, observeOnce } from "./utils/index";
import {
    AnimationState
} from "./types";
import type { MotionContext, MotionElement, MotionOptions } from "./types";
import type { AnimationPreset } from "./types";

/* -------------------------------------------------- */
/*  Interactivity callbacks                           */
/* -------------------------------------------------- */

store("motion-blocks", {
    callbacks: {
        /**
         * Entry point called automatically by the Interactivity API.
         */
        initMotion(): void {
            const { ref } = getElement() as { ref: MotionElement };
            const context = getContext() as MotionContext;

            if (!ref) return;

            // Respect user preference.
            if (prefersReducedMotion()) {
                ref.style.opacity = "1";
                console.info("Motion Blocks: animations disabled for reduced-motion user");
                return;
            }

            if (!context.motionEnabled || context.motionPreset === "none") {
                ref.style.opacity = "1";
                return;
            }

            // Build a strongly-typed options object from the block context.
            const motionOptions: MotionOptions = {
                duration: context.motionDuration ?? 600,
                delay: context.motionDelay ?? 0,
                easing: context.motionTimingFunction ?? "ease-out",
                threshold: (context.motionScrollRange ?? 30) / 100
            };

            // Initialise runtime state on the node to keep everything encapsulated.
            ref._motionState = AnimationState.IDLE;
            ref._animations = {};
            ref._hasBeenOutOfView = false;

            const elementAlreadyVisible = isElementFullyVisible(ref, 0.8);

            if (elementAlreadyVisible) {
                playEntryAnimation(ref, context, motionOptions);
            } else {
                // Wait until the element first enters the viewport, then start entry animation.
                const waitUntilVisible = observeOnce(
                    ref,
                    true,
                    () => playEntryAnimation(ref, context, motionOptions),
                    { threshold: 0.1, rootMargin: "50px" }
                );
            }
        }
    }
});

/* -------------------------------------------------- */
/*  Local helper functions (typed)                    */
/* -------------------------------------------------- */

function playEntryAnimation(
    el: MotionElement,
    ctx: MotionContext,
    opts: MotionOptions
): void {
    el._motionState = AnimationState.ENTRY_PLAYING;

    // Pass only the timing-related fields into the low-level helper.
    const { duration, delay, easing } = opts;
    const animation = createEntranceAnimation(
        el,
        ctx.motionPreset as AnimationPreset,
        { duration, delay, easing }
    );

    if (!animation) return;

    el._animations!.entrance = animation;

    onAnimationFinish(animation, () => {
        el._motionState = AnimationState.ENTRY_COMPLETE;

        if (ctx.motionScrollEnabled) {
            // When the element leaves the viewport after its first show, start scroll-animation monitoring.
            const waitUntilOutOfView = observeOnce(
                el,
                false,
                () => {
                    el._motionState = AnimationState.SCROLL_READY;
                    activateScrollAnimation(el, ctx, opts);
                },
                { threshold: 0, rootMargin: "0px" }
            );
        }
    });
}

function activateScrollAnimation(
    el: MotionElement,
    ctx: MotionContext,
    _opts: MotionOptions
): void {
    if (el._motionState !== AnimationState.SCROLL_READY) return;

    el._motionState = AnimationState.SCROLL_ACTIVE;

    if (!el._animations!.scroll) {
        const scrollAnim = createScrollAnimation(
            el,
            ctx.motionPreset as AnimationPreset
        );
        if (scrollAnim) {
            el._animations!.scroll = scrollAnim;
        } else {
            return; // API not available, exit early
        }
    }
} 