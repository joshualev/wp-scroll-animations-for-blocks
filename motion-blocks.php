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
 * Initialize the plugin
 */
function motion_blocks_init()
{
    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    // Register our block editor assets
    wp_register_script(
        'motion-blocks-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    // Enqueue editor script
    add_action('enqueue_block_editor_assets', function () {
        wp_enqueue_script('motion-blocks-editor');
    });

    // Enqueue frontend assets
    add_action('wp_enqueue_scripts', function () use ($asset_file) {
        $view_asset_file = include plugin_dir_path(__FILE__) . 'build/view.asset.php';

        // Check if wp_enqueue_script_module exists (WordPress 6.5+)
        if (function_exists('wp_enqueue_script_module')) {
            // Enqueue frontend script as a module with wp-interactivity dependency
            // Using exact pattern from working example
            wp_enqueue_script_module(
                'motion-blocks-frontend',
                plugins_url('build/view.js', __FILE__),
                $view_asset_file['dependencies'],
                $view_asset_file['version']
            );
        } else {
            // Fallback for older WordPress versions
            wp_enqueue_script(
                'motion-blocks-frontend-fallback',
                plugins_url('build/view.js', __FILE__),
                array(),
                $view_asset_file['version'],
                true
            );
        }

        // Add custom styles for motion animations
        wp_enqueue_style(
            'motion-blocks-styles',
            plugins_url('build/style-view.css', __FILE__),
            array(),
            $asset_file['version']
        );
    });
}
add_action('init', 'motion_blocks_init');

/**
 * Process blocks to add Interactivity API directives.
 */
function motion_blocks_render_block($block_content, $block)
{
    // Only process blocks that have motion enabled
    if (
        empty($block['attrs']['motionEnabled']) ||
        empty($block['attrs']['motionPreset']) ||
        $block['attrs']['motionPreset'] === 'none'
    ) {
        return $block_content;
    }

    // Skip if Interactivity API not available
    if (!function_exists('wp_enqueue_script_module')) {
        return $block_content;
    }

    // Extract motion attributes
    $preset = $block['attrs']['motionPreset'];
    $duration = $block['attrs']['motionDuration'] ?? 600;
    $delay = $block['attrs']['motionDelay'] ?? 0;
    $timing_function = $block['attrs']['motionTimingFunction'] ?? 'ease-out';
    $scroll_enabled = $block['attrs']['motionScrollEnabled'] ?? false;
    $scroll_range = $block['attrs']['motionScrollRange'] ?? 30;

    // Create a simplified context for the Interactivity API.
    $context = array(
        'motionEnabled'       => $block['attrs']['motionEnabled'] ?? false,
        'motionPreset'        => $preset,
        'motionDuration'      => $duration,
        'motionDelay'         => $delay,
        'motionTimingFunction' => $timing_function,
        'motionScrollEnabled' => $scroll_enabled,
        'motionScrollRange'   => $scroll_range,
    );

    // Add WordPress Interactivity API directives to the block
    $processor = new WP_HTML_Tag_Processor($block_content);

    if ($processor->next_tag()) {
        // Add Interactivity API directives
        $processor->set_attribute('data-wp-interactive', 'motion-blocks');
        $processor->set_attribute('data-wp-init', 'callbacks.initMotion');
        $processor->set_attribute('data-wp-context', wp_json_encode($context, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP));

        // Add data attributes for Web Animations API targeting
        $processor->set_attribute('data-motion-enabled', 'true');
        $processor->set_attribute('data-motion-preset', $preset);
        $processor->add_class('has-motion');

        // Animation parameters are now handled directly by the Web Animations API
        // No need for CSS custom properties
    }

    return $processor->get_updated_html();
}
add_filter('render_block', 'motion_blocks_render_block', 10, 2);
