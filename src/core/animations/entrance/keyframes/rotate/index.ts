const rotateIn: Keyframe[] = [
    { opacity: 0, transform: 'rotate3d(0, 0, 1, -200deg)', transformOrigin: 'center' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', transformOrigin: 'right bottom' }
];

const rotateInDownLeft: Keyframe[] = [
    { opacity: 0, transform: 'rotate3d(0, 0, 1, -45deg)', transformOrigin: 'left bottom' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', transformOrigin: 'left bottom' }
];

const rotateInDownRight: Keyframe[] = [
    { opacity: 0, transform: 'rotate3d(0, 0, 1, 45deg)', transformOrigin: 'right bottom' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', transformOrigin: 'right bottom' }
];

const rotateInUpLeft: Keyframe[] = [
    { opacity: 0, transform: 'rotate3d(0, 0, 1, 45deg)', transformOrigin: 'left bottom' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', transformOrigin: 'left bottom' }
];

const rotateInUpRight: Keyframe[] = [
    { opacity: 0, transform: 'rotate3d(0, 0, 1, -90deg)', transformOrigin: 'right bottom' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', transformOrigin: 'right bottom' }
];

export const ROTATE_IN_KEYFRAMES = {
    'rotate-in': rotateIn,
    'rotate-in-down-left': rotateInDownLeft,
    'rotate-in-down-right': rotateInDownRight,
    'rotate-in-up-left': rotateInUpLeft,
    'rotate-in-up-right': rotateInUpRight,
}; 

// Type definitions for this animation group
export type RotateAnimationType = keyof typeof ROTATE_IN_KEYFRAMES;

export const ROTATE_ANIMATION_NAMES = Object.keys(ROTATE_IN_KEYFRAMES) as RotateAnimationType[]; 