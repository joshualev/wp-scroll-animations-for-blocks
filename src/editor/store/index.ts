/**
 * Motion Blocks Store
 * ===================
 * 
 * Global store for managing animation preview state across the editor.
 * Uses WordPress data layer patterns for reactive state management.
 */

import { createReduxStore, register } from '@wordpress/data';

// Store name
export const STORE_NAME = 'motion-blocks/animation-preview';

// Initial state
interface MotionBlocksState {
    isAnimationPreviewEnabled: boolean;
}

const initialState: MotionBlocksState = {
    isAnimationPreviewEnabled: false,
};

// Action types
const TOGGLE_ANIMATION_PREVIEW = 'TOGGLE_ANIMATION_PREVIEW';
const SET_ANIMATION_PREVIEW = 'SET_ANIMATION_PREVIEW';

// Action creators
export const actions = {
    toggleAnimationPreview() {
        return {
            type: TOGGLE_ANIMATION_PREVIEW,
        };
    },
    
    setAnimationPreview(enabled: boolean) {
        return {
            type: SET_ANIMATION_PREVIEW,
            enabled,
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
            
        case SET_ANIMATION_PREVIEW:
            return {
                ...state,
                isAnimationPreviewEnabled: action.enabled,
            };
            
        default:
            return state;
    }
}

// Create and register the store
const store = createReduxStore(STORE_NAME, {
    reducer,
    actions,
    selectors,
});

register(store);

export default store; 