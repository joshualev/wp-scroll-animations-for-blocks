import { AnimationType } from "../types";

/**
 * Valid animation type values (string literals).
 * These are the actual string values stored in block attributes.
 */
type AnimationTypeValue = `${AnimationType}`;

/**
 * Type guard to check if a string is a valid animation type.
 * 
 * @param value - String to check
 * @returns True if value is a valid animation type
 */
function isAnimationType(value: string): value is AnimationTypeValue {
    return Object.values(AnimationType).includes(value as AnimationType);
}

/**
 * Safely converts a string to an AnimationType enum value.
 * 
 * @param value - String value from block attributes
 * @returns AnimationType enum value or null if invalid
 */
export function getAnimationType(value: string): AnimationType | null {
    if (isAnimationType(value)) {
        return value as AnimationType;
    }
    return null;
}


