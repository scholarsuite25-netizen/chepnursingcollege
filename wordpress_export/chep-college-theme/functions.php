<?php
/**
 * CHEP College of Nursing Sciences - Theme Functions
 *
 * @package CHEP_Nursing
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function chep_theme_setup() {
    // Theme Supports
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 280,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register Menus
    register_nav_menus(array(
        'primary' => __('Primary Navigation Menu', 'chep-nursing'),
        'footer'  => __('Footer Navigation Menu', 'chep-nursing'),
    ));
}
add_action('after_setup_theme', 'chep_theme_setup');

function chep_enqueue_scripts() {
    // Google Fonts: Plus Jakarta Sans & Inter
    wp_enqueue_style(
        'chep-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
        array(),
        null
    );

    // Material Symbols Outlined
    wp_enqueue_style(
        'chep-material-symbols',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        array(),
        null
    );

    // Core Stylesheet
    wp_enqueue_style(
        'chep-main-styles',
        get_template_directory_uri() . '/assets/css/main.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_style(
        'chep-theme-style',
        get_stylesheet_uri(),
        array('chep-main-styles'),
        '1.0.0'
    );

    // Core JavaScript
    wp_enqueue_script(
        'chep-main-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.0',
        true
    );

    // Pass AJAX Object to JS
    wp_localize_script('chep-main-script', 'chep_ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('chep_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'chep_enqueue_scripts');

/**
 * Helper to get theme asset URL
 */
function chep_asset($path = '') {
    return get_template_directory_uri() . '/assets/' . ltrim($path, '/');
}
