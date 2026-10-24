<?php
/**
 * Plugin Name: CHEP College Academic & Portal Core
 * Plugin URI: https://chepnursingcollege.vercel.app
 * Description: Core institutional academic database engine for CHEP College of Nursing Sciences. Manages native admissions queues, instant RRR screening slip generation, NMCN credential verification, and student ledgers.
 * Version: 1.0.0
 * Author: CHEP Academic Registry & Antigravity
 * Author URI: https://chepnursingcollege.org
 * License: GPLv2 or later
 * Text Domain: chep-portal
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CHEP_PORTAL_VERSION', '1.0.0');
define('CHEP_PORTAL_PATH', plugin_dir_path(__FILE__));
define('CHEP_PORTAL_URL', plugin_dir_url(__FILE__));

// Include Core Subsystems
require_once CHEP_PORTAL_PATH . 'includes/database.php';
require_once CHEP_PORTAL_PATH . 'includes/admin-pages.php';
require_once CHEP_PORTAL_PATH . 'includes/ajax-handlers.php';

// Activation Hook
register_activation_hook(__FILE__, 'chep_create_portal_tables');
