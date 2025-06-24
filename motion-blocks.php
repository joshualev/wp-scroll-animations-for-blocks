<?php

/**
 * Plugin Name:       Motion Blocks
 * Description:       Adds customizable motion effects to any Gutenberg block.
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            joshualev
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       motion-blocks
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Enqueue block editor assets.
 */
function motion_blocks_enqueue_block_editor_assets()
{
    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    wp_enqueue_script(
        'motion-blocks-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
        'motion-blocks-editor',
        plugins_url('build/index.css', __FILE__),
        array(),
        $asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'motion_blocks_enqueue_block_editor_assets');

/**
 * Enqueue frontend assets.
 */
function motion_blocks_enqueue_block_assets()
{
    $asset_file = include plugin_dir_path(__FILE__) . 'build/view.asset.php';

    wp_enqueue_script(
        'motion-blocks-frontend',
        plugins_url('build/view.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    wp_enqueue_style(
        'motion-blocks-frontend',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        $asset_file['version']
    );
}
add_action('enqueue_block_assets', 'motion_blocks_enqueue_block_assets');
