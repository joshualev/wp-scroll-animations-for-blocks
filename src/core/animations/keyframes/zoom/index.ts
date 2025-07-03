const zoomIn: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'scale3d(0.3, 0.3, 0.3)' 
	},
	{ 
		opacity: 1, 
		transform: 'scale3d(1, 1, 1)',
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' 
	}
];

const zoomInDown: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)', 
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' 
	},
	{ 
		opacity: 1, 
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)', 
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' 
	}
];

const zoomInUp: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)', 
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' 
	},
	{ 
		opacity: 1, 
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)', 
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' 
	}
];

const zoomInLeft: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)', 
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' 
	},
	{ 
		opacity: 1, 
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)', 
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' 
	}
];

const zoomInRight: Keyframe[] = [
	{ 
		opacity: 0, 
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)', 
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' 
	},
	{ 
		opacity: 1, 
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)', 
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' 
	}
];

export const ZOOM_IN_KEYFRAMES = {
	'zoom-in': zoomIn,
	'zoom-in-down': zoomInDown,
	'zoom-in-up': zoomInUp,
	'zoom-in-left': zoomInLeft,
	'zoom-in-right': zoomInRight,
};

// Type definitions for this animation group
export type ZoomAnimationType = keyof typeof ZOOM_IN_KEYFRAMES;

export const ZOOM_ANIMATION_NAMES = Object.keys(ZOOM_IN_KEYFRAMES) as ZoomAnimationType[];