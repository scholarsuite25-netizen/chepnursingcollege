<?php
/**
 * Plugin Name: CHEP Clinical CAOSCE & Simulation Academy Suite
 * Plugin URI: https://chepnursingcollege.org
 * Description: International-grade clinical examination academy packaging the 6-Station Autonomous Online CAOSCE circuit, 60FPS Hemodynamic Vector Oscilloscope, 3PL IRT Adaptive Testing engine, Edge AI Proctoring HUD, WHO Partograph, NGN EHR Case Study, and OSPE Diagnostic Studio.
 * Version: 2.0.0
 * Author: CHEP College of Nursing Sciences
 * Author URI: https://chepnursingcollege.org
 * Text Domain: chep-exam-suite
 * License: Proprietary / Institutional
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CHEP_EXAM_SUITE_VERSION', '2.0.0');
define('CHEP_EXAM_SUITE_PATH', plugin_dir_path(__FILE__));
define('CHEP_EXAM_SUITE_URL', plugin_dir_url(__FILE__));

// Load Database & AJAX modules
require_once CHEP_EXAM_SUITE_PATH . 'includes/class-exam-database.php';
require_once CHEP_EXAM_SUITE_PATH . 'includes/class-exam-ajax.php';

// Plugin Activation: Create Tables
register_activation_hook(__FILE__, array('CHEP_Exam_Database', 'install_tables'));

// Register Shortcode
function chep_register_exam_shortcode() {
    add_shortcode('chep_examination_academy', 'chep_render_exam_academy_shortcode');
}
add_action('init', 'chep_register_exam_shortcode');

function chep_render_exam_academy_shortcode() {
    ob_start();
    include CHEP_EXAM_SUITE_PATH . 'templates/exam-runner-template.php';
    return ob_get_clean();
}

// Add page template filter so theme or plugin can render standalone /exams
function chep_exam_register_page_template($templates) {
    $templates['template-exams.php'] = __('CHEP Clinical Examination & Simulation Academy', 'chep-exam-suite');
    return $templates;
}
add_filter('theme_page_templates', 'chep_exam_register_page_template');

function chep_exam_load_page_template($template) {
    if (is_page('exams') || is_page_template('template-exams.php')) {
        $plugin_template = CHEP_EXAM_SUITE_PATH . 'templates/exam-runner-template.php';
        if (file_exists($plugin_template)) {
            return $plugin_template;
        }
    }
    return $template;
}
add_filter('template_include', 'chep_exam_load_page_template', 99);

// Enqueue Exam Academy Assets
function chep_exam_enqueue_assets() {
    if (is_page('exams') || is_page_template('template-exams.php') || has_shortcode(get_post()->post_content ?? '', 'chep_examination_academy')) {
        // Tailwind via CDN / Theme styles
        wp_enqueue_style(
            'chep-exam-suite-css',
            CHEP_EXAM_SUITE_URL . 'assets/css/clinical-exam-suite.css',
            array(),
            CHEP_EXAM_SUITE_VERSION
        );

        // Core Exam Data
        wp_enqueue_script(
            'chep-caosce-data',
            CHEP_EXAM_SUITE_URL . 'assets/js/caosce-exam-data.js',
            array(),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        // 60FPS Hemodynamics Oscilloscope Engine
        wp_enqueue_script(
            'chep-hemodynamic-engine',
            CHEP_EXAM_SUITE_URL . 'assets/js/hemodynamic-engine.js',
            array('chep-caosce-data'),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        // 3PL IRT Adaptive Engine
        wp_enqueue_script(
            'chep-irt-cat-engine',
            CHEP_EXAM_SUITE_URL . 'assets/js/irt-cat-engine.js',
            array('chep-caosce-data'),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        // Edge AI Proctoring HUD
        wp_enqueue_script(
            'chep-edge-proctoring-hud',
            CHEP_EXAM_SUITE_URL . 'assets/js/edge-proctoring-hud.js',
            array(),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        // Generative Clinical AI Scenarios
        wp_enqueue_script(
            'chep-clinical-ai-scenarios',
            CHEP_EXAM_SUITE_URL . 'assets/js/clinical-ai-scenarios.js',
            array('chep-caosce-data'),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        // Master UI & Simulation Controller
        wp_enqueue_script(
            'chep-exam-main-controller',
            CHEP_EXAM_SUITE_URL . 'assets/js/examination-academy-main.js',
            array('chep-caosce-data', 'chep-hemodynamic-engine', 'chep-irt-cat-engine', 'chep-edge-proctoring-hud', 'chep-clinical-ai-scenarios'),
            CHEP_EXAM_SUITE_VERSION,
            true
        );

        wp_localize_script('chep-exam-main-controller', 'chepExamConfig', array(
            'ajaxUrl'   => admin_url('admin-ajax.php'),
            'examNonce' => wp_create_nonce('chep_exam_nonce'),
            'siteUrl'   => site_url(),
        ));
    }
}
add_action('wp_enqueue_scripts', 'chep_exam_enqueue_assets');

// Admin Menu for Exam Audit Logs
function chep_exam_admin_menu() {
    add_menu_page(
        __('CHEP Exam Academy', 'chep-exam-suite'),
        __('CHEP Exam Academy', 'chep-exam-suite'),
        'manage_options',
        'chep-exam-academy',
        'chep_render_exam_admin_page',
        'dashicons-welcome-learn-more',
        26
    );
}
add_action('admin_menu', 'chep_exam_admin_menu');

function chep_render_exam_admin_page() {
    include CHEP_EXAM_SUITE_PATH . 'includes/admin-exam-view.php';
}
