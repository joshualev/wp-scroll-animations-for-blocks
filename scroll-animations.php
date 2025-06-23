<?php

/**
 * Plugin Name: Scroll Animations for Blocks
 * Description: Add scroll animations to all Gutenberg blocks with customizable settings.
 * Version: 2.0.0
 * Stable tag: 2.0.0
 * Author: Simply Dev
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: scroll-animations-for-blocks
 * Domain Path: /languages
 * Tested up to: 6.7.2
 * Requires at least: 6.5
 * Requires PHP: 7.4
 *
 * @package ScrollAnimations
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Initialize the plugin
 */
function scroll_animations_init()
{
    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    // Register our block editor assets
    wp_register_script(
        'scroll-animations-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    // Enqueue editor script
    add_action('enqueue_block_editor_assets', function () {
        wp_enqueue_script('scroll-animations-editor');
    });

    // Enqueue frontend assets
    add_action('wp_enqueue_scripts', function () use ($asset_file) {
        // Enqueue frontend script as a module with wp-interactivity dependency
        wp_enqueue_script_module(
            'scroll-animations-frontend',
            plugins_url('build/frontend.js', __FILE__),
            array('@wordpress/interactivity'),
            $asset_file['version']
        );

        // Add custom styles for scroll animations
        wp_enqueue_style(
            'scroll-animations-styles',
            plugins_url('build/style-index.css', __FILE__),
            array(),
            $asset_file['version']
        );
    });
}
add_action('init', 'scroll_animations_init');

function scroll_animations_render_block($block_content, $block)
{
    $attributes = $block['attrs'];

    if (! empty($attributes['scrollAnimationEnabled'])) {
        $animation_context = [
            'type'      => $attributes['scrollAnimationType'] ?? 'fade',
            'direction' => $attributes['scrollAnimationDirection'] ?? 'center',
            'threshold' => $attributes['scrollAnimationThreshold'] ?? 0.5,
            'duration'  => $attributes['scrollAnimationDuration'] ?? 1000,
            'delay'     => $attributes['scrollAnimationDelay'] ?? 0,
            'repeat'    => $attributes['scrollAnimationRepeat'] ?? false,
            'inView'    => false,
        ];

        $processor = new WP_HTML_Tag_Processor($block_content);
        if ($processor->next_tag()) {
            $processor->set_attribute('data-wp-interactive', 'scroll-animations');
            $processor->set_attribute('data-wp-context', wp_json_encode($animation_context, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP));
            $processor->set_attribute('data-wp-init', 'callbacks.onInit');
            $processor->set_attribute('data-wp-class--animate-in', 'context.inView');

            return $processor->get_updated_html();
        }
    }

    return $block_content;
}

add_filter('render_block', 'scroll_animations_render_block', 10, 2);
