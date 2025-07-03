const rollIn: Keyframe[] = [
	{
		opacity: 0,
		transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
	},
	{
		opacity: 1,
		transform: 'translate3d(0, 0, 0)',
	},
];

export const ROLL_IN_KEYFRAMES = {
	'roll-in': rollIn,
};

// Type definitions for this animation group
export type RollAnimationType = keyof typeof ROLL_IN_KEYFRAMES;

export const ROLL_ANIMATION_NAMES = Object.keys(ROLL_IN_KEYFRAMES) as RollAnimationType[];