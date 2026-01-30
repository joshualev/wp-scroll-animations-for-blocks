# Motion Blocks

Adds customizable motion effects to any Gutenberg block. The plugin extends all blocks with motion settings in the editor and applies animations on the frontend using the WordPress Interactivity API and the Web Animations API, while respecting the user’s reduced-motion preference.

## Features
- Per-block motion controls (enable/disable, animation type/direction, duration, delay, easing, scroll threshold)
- Scroll-based animations or one-time entrance animations
- Global “Animation Preview” sidebar to preview all animations in the editor
- Interactivity API integration with a fallback for older WordPress versions

## Requirements
- WordPress 6.8+ (as declared in the plugin header)
- PHP 7.4+
- Node.js + npm (for local development/builds)

## Installation (WordPress)
1. Place this folder in `wp-content/plugins/` (folder name can remain `wp-scroll-animations-for-blocks`).
2. Activate **Motion Blocks** in the WordPress admin.
3. Build assets (if not already present) with `npm run build`.

## Development setup
```bash
npm install
```

### Build once (production)
```bash
npm run build
```

### Watch mode (development)
```bash
npm run start
```

### Linting / formatting / tests
```bash
npm run lint:js
npm run lint:css
npm run format
npm run test
```

## How it works (high-level)
- **Editor controls**: `src/editor/` extends all blocks with `mb_`-prefixed attributes and adds inspector controls.  
- **Global preview**: `src/editor/global-controls/` provides a plugin sidebar toggle to preview animations.
- **Frontend runtime**: `src/frontend/` uses the Interactivity API store `motion-blocks` and initializes animations per block.
- **PHP bridge**: `motion-blocks.php` attaches `data-wp-*` attributes during `render_block` and enqueues built assets.

## Project structure
- `motion-blocks.php` — plugin bootstrap, asset enqueueing, and render filters
- `src/editor/` — block inspector UI and global preview sidebar
- `src/frontend/` — Interactivity API entry and animation initialization
- `src/core/` — animation data, motion logic, SCSS, and types
- `webpack.config.js` — builds editor and frontend bundles (modules for WP 6.5+)
- `build/` — compiled JS/CSS output from `wp-scripts`

## Adding or editing animations
- Animation definitions live in `src/core/animations/`.
- The editor reads available animations via `src/editor/block-controls/adapters/core-data-bridge.ts`.
- Update both places to expose new animations in the UI.

## Notes
- The frontend respects `prefers-reduced-motion` and disables animations when enabled.
- If you see a Browserslist warning, run:
  ```bash
  npx update-browserslist-db@latest
  ```

