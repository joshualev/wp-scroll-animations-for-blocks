const slideInDown: Keyframe[] = [
	{ 
		opacity: 0,
		transform: 'translate3d(0, -100%, 0)', 
		visibility: 'hidden' 
	},
	{ 
		opacity: 1,
		transform: 'translate3d(0, 0, 0)', 
		visibility: 'visible' 
	}
];

const slideInUp: Keyframe[] = [
	{ 
		opacity: 0,
		transform: 'translate3d(0, 100%, 0)', 
		visibility: 'hidden' 
	},
	{ 
		opacity: 1,
		transform: 'translate3d(0, 0, 0)', 
		visibility: 'visible' 
	}
];

const slideInLeft: Keyframe[] = [
	{ 
		opacity: 0,
		transform: 'translate3d(-100%, 0, 0)', 
		visibility: 'hidden' 
	},
	{ 
		opacity: 1,
		transform: 'translate3d(0, 0, 0)', 
		visibility: 'visible' 
	}
];

const slideInRight: Keyframe[] = [
	{ 
		opacity: 0,
		transform: 'translate3d(100%, 0, 0)', 
		visibility: 'hidden' 
	},
	{ 
		opacity: 1,
		transform: 'translate3d(0, 0, 0)', 
		visibility: 'visible' 
	}
];

export const SLIDE_IN_KEYFRAMES = {
	'slide-in-down': slideInDown,
	'slide-in-up': slideInUp,
	'slide-in-left': slideInLeft,
	'slide-in-right': slideInRight,
};

// Type definitions for this animation group
export type SlideAnimationType = keyof typeof SLIDE_IN_KEYFRAMES;

export const SLIDE_ANIMATION_NAMES = Object.keys(SLIDE_IN_KEYFRAMES) as SlideAnimationType[];