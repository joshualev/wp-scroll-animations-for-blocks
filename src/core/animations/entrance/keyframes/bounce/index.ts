const bounceIn: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, -3000px, 0) scaleY(3)',
	},
	{
		offset: 0.6,
		opacity: 1,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 25px, 0) scaleY(0.9)',
	},
	{
		offset: 0.75,
		opacity: 1,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, -10px, 0) scaleY(0.95)',
	},
	{
		offset: 0.9,
		opacity: 1,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 5px, 0) scaleY(0.985)',
	},
	{
		offset: 1,
		opacity: 1,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 0, 0)',
	},
];

const bounceInDown: Keyframe[] = [
	{ 
		...bounceIn[0], 
		opacity: 0 
	},
	{ 
		...bounceIn[1], 
		opacity: 1 
	},
	{ 
		...bounceIn[2],
		opacity: 1
	},
	{ 
		...bounceIn[3],
		opacity: 1
	},
	{ 
		...bounceIn[4], 
		opacity: 1 
	},
];

const bounceInUp: Keyframe[] = [
	{ 
		...bounceInDown[0], 
		transform: 'translate3d(0, 3000px, 0) scaleY(5)' 
	},
	{ 
		...bounceInDown[1], 
		transform: 'translate3d(0, -20px, 0) scaleY(0.9)' 
	},
	{ 
		...bounceInDown[2], 
		transform: 'translate3d(0, 10px, 0) scaleY(0.95)' 
	},
	{ 
		...bounceInDown[3], 
		transform: 'translate3d(0, -5px, 0) scaleY(0.985)' 
	},
	{ 
		...bounceInDown[4],
		transform: 'translate3d(0, 0, 0)'
	},
];

const bounceInLeft: Keyframe[] = [
	{ 
		...bounceInDown[0], 
		transform: 'translate3d(-3000px, 0, 0) scaleX(3)' 
	},
	{ 
		...bounceInDown[1], 
		transform: 'translate3d(25px, 0, 0) scaleX(1)' 
	},
	{ 
		...bounceInDown[2], 
		transform: 'translate3d(-10px, 0, 0) scaleX(0.98)' 
	},
	{ 
		...bounceInDown[3], 
		transform: 'translate3d(5px, 0, 0) scaleX(0.995)' 
	},
	{ 
		...bounceInDown[4], 
		transform: 'translate3d(0, 0, 0)' 
	},
];

const bounceInRight: Keyframe[] = [
	{ 
		...bounceInDown[0], 
		transform: 'translate3d(3000px, 0, 0) scaleX(3)' 
	},
	{ 
		...bounceInDown[1], 
		transform: 'translate3d(-25px, 0, 0) scaleX(1)' 
	},
	{ 
		...bounceInDown[2], 
		transform: 'translate3d(10px, 0, 0) scaleX(0.98)' 
	},
	{ 
		...bounceInDown[3], 
		transform: 'translate3d(-5px, 0, 0) scaleX(0.995)' 
	},
	{ 
		...bounceInDown[4], 
		transform: 'translate3d(0, 0, 0)' 
	},
];

// Keyframes object with proper typing
export const BOUNCE_IN_KEYFRAMES = {
	'bounce-in': bounceIn,
	'bounce-in-down': bounceInDown,
	'bounce-in-left': bounceInLeft,
	'bounce-in-right': bounceInRight,
	'bounce-in-up': bounceInUp,
};

// Type definitions for this animation group
export type BounceAnimationType = keyof typeof BOUNCE_IN_KEYFRAMES;
// Array of all available animation types for iteration/selection
export const BOUNCE_ANIMATION_NAMES = Object.keys(BOUNCE_IN_KEYFRAMES) as BounceAnimationType[];
