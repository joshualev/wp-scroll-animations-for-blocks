export const slideInLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(-100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0)',
	},
];

export const slideInRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translateX(100%)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translateX(0)',
	},
];

export const slideInUp: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translate3d(0, 100%, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translate3d(0, 0, 0)',
	},
];

export const slideInDown: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translate3d(0, -100%, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translate3d(0, 0, 0)',
	},
];