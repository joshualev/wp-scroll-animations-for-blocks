export const rotateIn: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transformOrigin: 'center center',
		transform: 'rotate3d(0, 0, 1, -200deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transformOrigin: 'center center',
		transform: 'translate3d(0, 0, 0)',
	},
];

export const rotateInDownLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transformOrigin: 'left bottom',
		transform: 'rotate3d(0, 0, 1, -45deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transformOrigin: 'left bottom',
		transform: 'translate3d(0, 0, 0)',
	},
];

export const rotateInDownRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transformOrigin: 'right bottom',
		transform: 'rotate3d(0, 0, 1, 45deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transformOrigin: 'right bottom',
		transform: 'translate3d(0, 0, 0)',
	},
];

export const rotateInUpLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transformOrigin: 'left bottom',
		transform: 'rotate3d(0, 0, 1, 45deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transformOrigin: 'left bottom',
		transform: 'translate3d(0, 0, 0)',
	},
];

export const rotateInUpRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transformOrigin: 'right bottom',
		transform: 'rotate3d(0, 0, 1, -90deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transformOrigin: 'right bottom',
		transform: 'translate3d(0, 0, 0)',
	},
];