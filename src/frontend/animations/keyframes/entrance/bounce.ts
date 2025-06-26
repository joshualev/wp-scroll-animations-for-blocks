export const bounceInDown: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 0,
		transform: 'translate3d(0, -3000px, 0) scaleY(3)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 1,
		transform: 'translate3d(0, 25px, 0) scaleY(0.9)',
	},
	{
		offset: 0.75,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, -10px, 0) scaleY(0.95)',
	},
	{
		offset: 0.9,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 5px, 0) scaleY(0.985)',
	},
	{
		offset: 1,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 0, 0)',
		opacity: 1,
	},
];

export const bounceInUp: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 0,
		transform: 'translate3d(0, 3000px, 0) scaleY(5)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 1,
		transform: 'translate3d(0, -20px, 0) scaleY(0.9)',
	},
	{
		offset: 0.75,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, 10px, 0) scaleY(0.95)',
	},
	{
		offset: 0.9,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(0, -5px, 0) scaleY(0.985)',
	},
	{ 
        offset: 1, 
        transform: 'translate3d(0, 0, 0)', 
        opacity: 1 
    },
];

export const bounceInLeft: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 0,
		transform: 'translate3d(-3000px, 0, 0) scaleX(3)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 1,
		transform: 'translate3d(25px, 0, 0) scaleX(1)',
	},
	{
		offset: 0.75,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(-10px, 0, 0) scaleX(0.98)',
	},
	{
		offset: 0.9,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(5px, 0, 0) scaleX(0.995)',
	},
	{ offset: 1, transform: 'translate3d(0, 0, 0)', opacity: 1 },
];

export const bounceInRight: Keyframe[] = [
	{
		offset: 0,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 0,
		transform: 'translate3d(3000px, 0, 0) scaleX(3)',
	},
	{
		offset: 0.6,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		opacity: 1,
		transform: 'translate3d(-25px, 0, 0) scaleX(1)',
	},
	{
		offset: 0.75,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(10px, 0, 0) scaleX(0.98)',
	},
	{
		offset: 0.9,
		easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		transform: 'translate3d(-5px, 0, 0) scaleX(0.995)',
	},
	{
		offset: 1,
		transform: 'translate3d(0, 0, 0)',
		opacity: 1,
	},
];
