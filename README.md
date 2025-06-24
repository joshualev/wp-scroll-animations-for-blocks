# Motion Blocks

A lightweight WordPress plugin that adds highly configurable motion effects to any Gutenberg block using WordPress scripts best practices.

## Description

Motion Blocks allows you to add smooth, performant scroll animations to any block in the WordPress editor. Each block can be configured with its own animation settings, including presets, start/end thresholds, duration, easing, and more.

## Features

-   **Extend ALL blocks**: Adds motion controls to every Gutenberg block
-   **Rich animation controls per block**:
    -   Enable/disable motion
    -   Animation presets (Fade, Slide Up/Down/Left/Right, Zoom In/Out, Rotate, Flip X/Y)
    -   Delay and Duration controls
    -   Easing functions (ease, ease-in, ease-out, ease-in-out, linear)
    -   Start and End Thresholds for fine-grained control
    -   "Play Once" setting
-   **Lightweight and performance-optimized**: Runtime ~6kB total (3.8kB editor + 3kB frontend)
-   **Uses IntersectionObserver** for efficient scroll detection with 101 thresholds for smooth animations
-   **Progressive animations**: Elements animate smoothly based on scroll position, not just on/off
-   **Elements in viewport on page load** are properly handled
-   **Accessibility**: Respects `prefers-reduced-motion` setting

## Technical Stack

-   Built with `@wordpress/scripts` v28.3.0 following WordPress best practices
-   Vanilla JavaScript frontend (no jQuery or heavy dependencies)
-   SCSS for styling
-   Jest for unit testing
-   Playwright for E2E testing
-   WordPress 6.8+ compatible

## Installation

1.  Download the plugin zip file.
2.  Go to your WordPress admin dashboard > Plugins > Add New.
3.  Click "Upload Plugin" and select the downloaded zip file.
4.  Click "Install Now" and then "Activate".

## Usage

1.  Edit any post or page with the WordPress editor.
2.  Select any block (paragraph, image, heading, etc.).
3.  In the block settings sidebar, find the "Motion" panel.
4.  Enable motion and configure the settings to your liking.
5.  The animations will work automatically on the frontend.

## Development

This plugin uses `@wordpress/scripts` for development following WordPress best practices.

### Getting Started

```bash
# Clone the repository
git clone [repository-url]
cd motion-blocks

# Install dependencies
npm install

# Start development mode (watch for changes)
npm run start

# Build for production
npm run build
```

### Testing

```bash
# Run unit tests
npm test

# Run E2E tests (requires Docker)
npm run wp-env start
npm run test:e2e

# Debug E2E tests
npm run test:e2e:debug
```

### Code Quality

```bash
# Format code
npm run format

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css
```

## File Structure

```
motion-blocks/
├── src/
│   ├── index.js          # Editor script (extends all blocks)
│   ├── view.js           # Frontend animation script
│   ├── style.scss        # Frontend styles
│   └── __tests__/        # Unit tests
├── tests/e2e/            # E2E tests
├── build/                # Built assets
├── motion-blocks.php     # Main plugin file
└── package.json          # Dependencies and scripts
```

## Requirements

-   **WordPress**: 6.8 or higher
-   **PHP**: 7.4 or higher
-   **Browser**: Modern browser with `IntersectionObserver` support
-   **Development**: Node.js 18+, npm, Docker (for E2E tests)

## Build Output

- **Editor bundle**: `build/index.js` (~3.8kB minified)
- **Frontend bundle**: `build/view.js` (~3kB minified)
- **Total runtime**: ~6.8kB (well under 9kB requirement)

## Browser Support

- Chrome 58+
- Firefox 55+
- Safari 12.1+
- Edge 79+

(All browsers with IntersectionObserver support)

## License

GPL v2.0 or later

## Author

joshualev