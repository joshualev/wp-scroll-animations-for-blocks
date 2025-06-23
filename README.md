=== Scroll Animations for Blocks ===
Contributors: joshualev
Tags: gutenberg, blocks, animations, scroll, effects
Requires at least: 6.0
Tested up to: 6.7.2
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

# Scroll Animations for Blocks

A lightweight WordPress plugin that adds scroll animations to all Gutenberg blocks.

## Description

Scroll Animations for Gutenberg allows you to add smooth scroll animations to any block in the WordPress editor. Each block can be configured with its own animation settings, including threshold, duration, and delay.

## Features

- Add scroll animations to any Gutenberg block
- Customizable animation settings per block:
  - Enable/disable animation
  - Threshold (when the animation triggers)
  - Duration (how long the animation lasts)
  - Delay (when the animation starts)
- Lightweight and performance optimized
- Uses Intersection Observer API for smooth performance

## Installation

1. Download the plugin zip file
2. Go to WordPress admin > Plugins > Add New
3. Click "Upload Plugin" and select the downloaded zip file
4. Click "Install Now" and then "Activate"

## Usage

1. Edit any post or page with the WordPress editor
2. Select any block
3. In the block settings sidebar, look for the "Scroll Animation" panel
4. Enable the animation and adjust the settings as needed:
   - Threshold: When the block should start animating (0-1)
   - Duration: How long the animation should last (0-5000ms)
   - Delay: When the animation should start (0-5000ms)

## Development

This plugin uses `@wordpress/scripts` for development. To get started:

1. Clone the repository
2. Run `npm install`
3. Run `npm run start` for development
4. Run `npm run build` for production build

## Requirements

- WordPress 5.0 or higher
- Modern web browser with Intersection Observer API support

## License

GPL v3 or later

## Author

joshualev