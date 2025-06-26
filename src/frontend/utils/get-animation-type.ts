import { 
    EntranceAnimationType, 
    ScrollAnimationType,
    ENTRANCE_ANIMATION_PRESETS,
    SCROLL_ANIMATION_PRESETS
} from "@/shared/types";

/**
 * Type guard to check if a string is a valid entrance animation type.
 * 
 * @param value - String to check
 * @returns True if value is a valid entrance animation type
 */
function isEntranceAnimationType(value: string): value is EntranceAnimationType {
    return ENTRANCE_ANIMATION_PRESETS.includes(value as EntranceAnimationType);
}



/**
 * Type guard to check if a string is a valid scroll animation type.
 * 
 * @param value - String to check
 * @returns True if value is a valid scroll animation type
 */
function isScrollAnimationType(value: string): value is ScrollAnimationType {
    return SCROLL_ANIMATION_PRESETS.includes(value as ScrollAnimationType);
}

/**
 * Safely converts a string to an EntranceAnimationType enum value.
 * 
 * @param value - String value from block attributes
 * @returns EntranceAnimationType enum value or null if invalid
 */
export function getEntranceAnimationType(value: string): EntranceAnimationType | null {
    if (value === "none") return null;
    if (isEntranceAnimationType(value)) {
        return value as EntranceAnimationType;
    }
    return null;
}



/**
 * Safely converts a string to a ScrollAnimationType enum value.
 * 
 * @param value - String value from block attributes
 * @returns ScrollAnimationType enum value or null if invalid
 */
export function getScrollAnimationType(value: string): ScrollAnimationType | null {
    if (value === "none") return null;
    if (isScrollAnimationType(value)) {
        return value as ScrollAnimationType;
    }
    return null;
}


