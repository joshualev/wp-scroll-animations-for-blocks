# Motion Blocks Observer System

## Overview

The Motion Blocks plugin uses a **simplified two-path animation system**: 

- **Entrance Animations**: Time-based animations that play once when elements become visible
- **Scroll Animations**: Position-based animations that progress continuously with scroll position

**Key Design Decision**: Users choose **EITHER** entrance animation **OR** scroll animation - not both. This eliminates complexity and provides a clear, reliable user experience.

## Architecture

### 1. Animation Type Selection

**Editor Interface**: Simple toggle between entrance and scroll animations
- **Default**: Entrance animation (fade-in)
- **Alternative**: Scroll animation (parallax, scale, rotate, fade, blur effects)
- **Mutual Exclusivity**: Choosing one automatically disables the other

### 2. Entrance Animation Path

**When**: Element first becomes visible in viewport
**Behavior**: Plays once and completes
**Implementation**:
- Uses `IntersectionObserver` with configurable thresholds
- Triggers time-based Web Animations API animations
- Supports 26 entrance animation types (bounce, fade, flip, slide, zoom, rotate, roll)

**Observer Flow**:
```
Element off-screen → Visibility Observer → Element visible → Entrance Animation → Complete
```

### 3. Scroll Animation Path  

**When**: User chooses scroll animation instead of entrance
**Behavior**: Animates continuously based on scroll position
**Implementation**:
- Uses CSS scroll-driven animations with `animation-timeline: view()`
- Real-time animation progress tied to viewport position
- Supports 6 scroll animation types (parallax, scale, rotate, fade, blur)
- Same visibility detection as entrance animations

**Observer Flow**:
```
Element off-screen → Visibility Observer → Element visible → Scroll Animation Setup → Continuous Animation
```

## Technical Benefits

### ✅ **Greatly Simplified Logic**
- Single visibility observer handles both animation types
- No complex leave/return viewport tracking
- Direct animation setup when element becomes visible
- Unified threshold system for all animations

### ✅ **Reliable Performance**
- No sensitive exit threshold detection
- No ping-pong effects from viewport boundaries
- Works consistently across all device sizes
- Smaller bundle size (13.8 KiB vs 21.6 KiB original)

### ✅ **Clear User Experience**
- Simple toggle: entrance OR scroll animation
- Single threshold control applies to both types
- Predictable animation behavior
- Easy to understand and configure

### ✅ **Maintainable Architecture**
- Single observer with clear responsibility
- Minimal complexity and edge cases
- Unified threshold and state management
- Easy debugging and testing

## File Structure

```
src/frontend/
├── motion-orchestrator.ts     # Main entry point and coordination
├── handlers/
│   ├── entrance-handler.ts    # Entrance animation lifecycle  
│   └── scroll-handler.ts      # Scroll animation setup
├── observers/
│   └── visibility-observer.ts # Universal visibility detection (both entrance and scroll)
└── animations/
    ├── create-entrance-animation.ts
    └── create-scroll-animation.ts
```

**Removed Files** (Complexity Eliminated):
- `src/frontend/observers/exit-observer.ts` - Complex exit animation logic
- `src/frontend/observers/scroll-observer.ts` - Complex leave/return tracking  
- `src/frontend/animations/create-exit-animation.ts` - Exit animation creation
- `src/frontend/animations/keyframes/exit/` - Exit keyframes directory

## Configuration

### Block Attributes

```javascript
{
  motionEnabled: boolean,           // Enable/disable animations
  entranceAnimationType: string,    // Entrance animation type or "none"
  scrollAnimationType: string,      // Scroll animation type or "none"
  scrollAnimationEnabled: boolean,  // Toggle: entrance OR scroll
  motionDuration: number,          // Duration for entrance animations
  motionDelay: number,             // Delay for entrance animations
  motionTimingFunction: string,    // Easing for entrance animations
  motionScrollRange: number        // Scroll threshold percentage
}
```

### Context Object

```javascript
{
  motionEnabled: true,
  entranceAnimationType: "fade-in" | "slide-in-up" | ...,
  scrollAnimationType: "parallax-up" | "scale-on-scroll" | ...,
  scrollAnimationEnabled: false,   // true = scroll, false = entrance
  // ... timing properties
}
```

## Animation Types

### Entrance Animations (26 types)
- **Bounce**: `bounce-in`, `bounce-in-down`, `bounce-in-left`, `bounce-in-right`, `bounce-in-up`
- **Fade**: `fade-in`, `fade-in-down`, `fade-in-left`, `fade-in-right`, `fade-in-up`
- **Flip**: `flip-in-x`, `flip-in-y`
- **Slide**: `slide-in-down`, `slide-in-left`, `slide-in-right`, `slide-in-up`
- **Zoom**: `zoom-in`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-in-up`
- **Rotate**: `rotate-in`, `rotate-in-down-left`, `rotate-in-down-right`, `rotate-in-up-left`, `rotate-in-up-right`
- **Special**: `roll-in`

### Scroll Animations (6 types)
- **Reveal**: `fade-in-up`, `fade-in-down`, `scale-in`
- **Directional**: `slide-in-left`, `slide-in-right`
- **Dynamic**: `rotate-in`

## Implementation Notes

### Browser Compatibility
- **Entrance Animations**: Universal support via Web Animations API
- **Scroll Animations**: Modern browsers with ViewTimeline API support
- **Graceful Degradation**: Falls back to entrance animations on older browsers

### Performance Considerations
- **Lazy Observer Creation**: Observers only created when needed
- **Automatic Cleanup**: Observers disconnect after triggering
- **Minimal Runtime Impact**: No ongoing observation for completed animations
- **Build Size Reduction**: 35% smaller bundle (14.1 KiB vs 21.6 KiB)

This simplified architecture provides reliable, performant animations while eliminating the complexity that was causing mobile compatibility issues and timing conflicts. 