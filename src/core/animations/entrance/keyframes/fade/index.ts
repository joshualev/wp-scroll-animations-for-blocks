const fadeIn: Keyframe[] = [
	{ opacity: 0 },
	{ opacity: 1 }
];

const fadeInDown: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'translate3d(0, -100%, 0)' 
	},
	{ 
		opacity: 1, 
		transform: 'translate3d(0, 0, 0)' 
	}
];

const fadeInUp: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'translate3d(0, 100%, 0)' 
	},
	{ 
		opacity: 1, 
		transform: 'translate3d(0, 0, 0)' 
	}
];

const fadeInLeft: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'translate3d(-100%, 0, 0)' 
	},
	{ 
		opacity: 1, 
		transform: 'translate3d(0, 0, 0)' 
	}
];

const fadeInRight: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'translate3d(100%, 0, 0)' 
	},
	{ 
		opacity: 1, 
		transform: 'translate3d(0, 0, 0)' 
	}
];

export const FADE_IN_KEYFRAMES = {
	'fade-in': fadeIn,
	'fade-in-down': fadeInDown,
	'fade-in-up': fadeInUp,
	'fade-in-left': fadeInLeft,
	'fade-in-right': fadeInRight,
};

// Type definitions for this animation group
export type FadeAnimationType = keyof typeof FADE_IN_KEYFRAMES;

export const FADE_ANIMATION_NAMES = Object.keys(FADE_IN_KEYFRAMES) as FadeAnimationType[];