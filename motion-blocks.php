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
 * Registers and enqueues all plugin assets (editor & frontend scripts/styles).
 * 
 * Sets up the block editor controls and frontend animation runtime using
 * WordPress 6.5+ script modules with fallback for older versions.
 */
function motion_blocks_init()
{
    $editor_assets = include plugin_dir_path(__FILE__) . 'build/editor.asset.php';

    // Register our block editor assets
    wp_register_script(
        'motion-blocks-editor',
        plugins_url('build/editor.js', __FILE__),
        $editor_assets['dependencies'],
        $editor_assets['version'],
        true
    );

    // Enqueue editor assets (script and styles)
    add_action('enqueue_block_editor_assets', function () use ($editor_assets) {
        wp_enqueue_script('motion-blocks-editor');

        // Enqueue editor styles
        wp_enqueue_style(
            'motion-blocks-editor',
            plugins_url('build/editor.css', __FILE__),
            array(),
            $editor_assets['version']
        );
    });

    // Enqueue frontend assets
    add_action('wp_enqueue_scripts', function () use ($editor_assets) {
        $frontend_assets = include plugin_dir_path(__FILE__) . 'build/frontend.asset.php';

        // Check if wp_enqueue_script_module exists (WordPress 6.5+)
        if (function_exists('wp_enqueue_script_module')) {
            // Enqueue frontend script as a module with wp-interactivity dependency
            // Using exact pattern from working example
            wp_enqueue_script_module(
                'motion-blocks-frontend',
                plugins_url('build/frontend.js', __FILE__),
                $frontend_assets['dependencies'],
                $frontend_assets['version']
            );
        } else {
            // Fallback for older WordPress versions
            wp_enqueue_script(
                'motion-blocks-frontend-fallback',
                plugins_url('build/frontend.js', __FILE__),
                array(),
                $frontend_assets['version'],
                true
            );
        }

        // Add custom styles for motion animations
        wp_enqueue_style(
            'motion-blocks-styles',
            plugins_url('build/frontend.css', __FILE__),
            array(),
            $editor_assets['version']
        );
    });
}
add_action('init', 'motion_blocks_init');

/**
 * Transforms blocks with motion settings into Interactivity API-compatible markup.
 * 
 * Adds `data-wp-*` attributes and JSON context so the frontend script can
 * initialize animations using the Web Animations API.
 * 
 * @param string $block_content The block's HTML content
 * @param array  $block         Block data including attributes
 * @return string Modified HTML with motion directives, or original content
 */
function motion_blocks_render_block($block_content, $block)
{
    $motion_attrs = $block['attrs'] ?? [];

    // Skip blocks without motion enabled
    if (empty($motion_attrs['motionEnabled'])) {
        return $block_content;
    }

    // Skip if Interactivity API unavailable
    if (!function_exists('wp_enqueue_script_module')) {
        return $block_content;
    }

    // Build context object for frontend script
    $motion_context = array(
        'motionEnabled'           => true,
        'entranceAnimationType'   => $motion_attrs['entranceAnimationType'] ?? 'fade-in',
        'scrollAnimationType'     => $motion_attrs['scrollAnimationType'] ?? 'none',
        'motionDuration'          => $motion_attrs['motionDuration'] ?? 600,
        'motionDelay'             => $motion_attrs['motionDelay'] ?? 0,
        'motionTimingFunction'    => $motion_attrs['motionTimingFunction'] ?? 'ease-out',
        'motionThreshold'         => $motion_attrs['motionThreshold'] ?? 30,
        'scrollAnimationEnabled'  => $motion_attrs['scrollAnimationEnabled'] ?? false,
        'scrollCompletionPoint'   => $motion_attrs['scrollCompletionPoint'] ?? 90,
    );

    // Add WordPress Interactivity API directives to the block
    $processor = new WP_HTML_Tag_Processor($block_content);

    if ($processor->next_tag()) {
        // Attach Interactivity API directives
        $processor->set_attribute('data-wp-interactive', 'motion-blocks');
        $processor->set_attribute('data-wp-init', 'callbacks.initMotion');
        $processor->set_attribute('data-wp-context', wp_json_encode(
            $motion_context,
            JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP
        ));

        // Add utility attributes for debugging and CSS targeting
        $processor->set_attribute('data-motion-enabled', 'true');
        $processor->set_attribute('data-motion-preset', $motion_attrs['entranceAnimationType'] ?? 'fade-in');
        if (!empty($motion_attrs['scrollAnimationEnabled'])) {
            $processor->set_attribute('data-scroll-type', $motion_attrs['scrollAnimationType'] ?? 'none');
        }
        $processor->add_class('has-motion');
    }

    return $processor->get_updated_html();
}
add_filter('render_block', 'motion_blocks_render_block', 10, 2);
