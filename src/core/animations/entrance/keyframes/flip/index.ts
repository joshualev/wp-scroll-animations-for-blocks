const flipInX: Keyframe[] = [
	{
		offset: 0,
		easing: 'ease-in',
		opacity: 0,
		transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
	},
	{
		offset: 0.4,
		easing: 'ease-in',
		opacity: 1,
		transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
	},
	{
		offset: 0.6,
		opacity: 1,
		transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
	},
	{
		offset: 0.8,
		opacity: 1,
		transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'perspective(400px)',
	},
];

const flipInY: Keyframe[] = [
	{
		offset: 0,
		easing: 'ease-in',
		opacity: 0,
		transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
	},
	{
		offset: 0.4,
		easing: 'ease-in',
		opacity: 1,
		transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
	},
	{
		offset: 0.6,
		opacity: 1,
		transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
	},
	{
		offset: 0.8,
		opacity: 1,
		transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'perspective(400px)',
	},
];

export const FLIP_IN_KEYFRAMES = {
	'flip-in-x': flipInX,
	'flip-in-y': flipInY,
};

// Type definitions for this animation group
export type FlipAnimationType = keyof typeof FLIP_IN_KEYFRAMES;

export const FLIP_ANIMATION_NAMES = Object.keys(FLIP_IN_KEYFRAMES) as FlipAnimationType[];

