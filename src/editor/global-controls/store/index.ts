/**
 * Motion Blocks Store
 * ===================
 * 
 * Global store for managing animation preview state across the editor.
 * Uses WordPress data layer patterns for reactive state management.
 */

import { createReduxStore, register } from '@wordpress/data';

// Store name
export const GLOBAL_MOTION_BLOCKS_STORE = 'motion-blocks/global-controls';

// Initial state
interface MotionBlocksState {
    isAnimationPreviewEnabled: boolean;
}

const initialState: MotionBlocksState = {
    isAnimationPreviewEnabled: false,
};

// Action types
const TOGGLE_ANIMATION_PREVIEW = 'TOGGLE_ANIMATION_PREVIEW';

// Action creators
export const actions = {
    toggleAnimationPreview() {
        return {
            type: TOGGLE_ANIMATION_PREVIEW,
        };
    },
};

// Selectors
export const selectors = {
    isAnimationPreviewEnabled(state: MotionBlocksState) {
        return state.isAnimationPreviewEnabled;
    },
};

// Reducer
function reducer(state = initialState, action: any): MotionBlocksState {
    switch (action.type) {
        case TOGGLE_ANIMATION_PREVIEW:
            return {
                ...state,
                isAnimationPreviewEnabled: !state.isAnimationPreviewEnabled,
            };
            
        default:
            return state;
    }
}

// Create and register the store
const store = createReduxStore(GLOBAL_MOTION_BLOCKS_STORE, {
    reducer,
    actions,
    selectors,
});

register(store);

export default store; 