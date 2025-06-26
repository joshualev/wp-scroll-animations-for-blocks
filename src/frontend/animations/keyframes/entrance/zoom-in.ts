export const zoomIn: Keyframe[] = [
	{
		offset: 0,
		opacity: 0,
		transform: 'scale(0.5)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale(1)',
	},
];

export const zoomInUp: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		opacity: 0,
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
		opacity: 1,
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
	},
];

export const zoomInDown: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		opacity: 0,
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
		opacity: 1,
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
	},
];

export const zoomInLeft: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		opacity: 0,
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
		opacity: 1,
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
	},
];

export const zoomInRight: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		opacity: 0,
		transform: 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
		opacity: 1,
		transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
	},
];