export const fadeIn: Keyframe[] = [
	{ opacity: 0, offset: 0 },
	{ opacity: 1, offset: 1 },
];

export const fadeInDown: Keyframe[] = [
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

export const fadeInLeft: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translate3d(-100%, 0, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translate3d(0, 0, 0)',
	},
];

export const fadeInRight: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'translate3d(100%, 0, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'translate3d(0, 0, 0)',
	},
];

export const fadeInUp: Keyframe[] = [
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