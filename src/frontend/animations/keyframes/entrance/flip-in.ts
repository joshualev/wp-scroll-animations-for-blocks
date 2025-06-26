export const flipInY: Keyframe[] = [
	{
		offset: 0,
		easing: 'ease-in',
		opacity: 0,
		transform: 'perspective(800px) rotate3d(0, 1, 0, 90deg)',
	},
	{
		offset: 0.4,
		easing: 'ease-in',
		transform: 'perspective(800px) rotate3d(0, 1, 0, -20deg)',
	},
	{
		offset: 0.6,
		opacity: 1,
		transform: 'perspective(800px) rotate3d(0, 1, 0, 10deg)',
	},
	{
		offset: 0.8,
		transform: 'perspective(800px) rotate3d(0, 1, 0, -5deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'perspective(800px) rotate3d(0, 1, 0, 0deg)',
	},
];

export const flipInX: Keyframe[] = [
	{
		offset: 0,
		easing: 'ease-in',
		opacity: 0,
		transform: 'perspective(800px) rotate3d(1, 0, 0, 90deg)',
	},
	{
		offset: 0.4,
		easing: 'ease-in',
		transform: 'perspective(800px) rotate3d(1, 0, 0, -20deg)',
	},
	{
		offset: 0.6,
		opacity: 1,
		transform: 'perspective(800px) rotate3d(1, 0, 0, 10deg)',
	},
	{
		offset: 0.8,
		transform: 'perspective(800px) rotate3d(1, 0, 0, -5deg)',
	},
	{
		offset: 1,
		opacity: 1,
		transform: 'perspective(800px) rotate3d(1, 0, 0, 0deg)',
	},
];

