<?php
/**
 * Database installer & repository for CHEP Exam Suite
 */

if (!defined('ABSPATH')) {
    exit;
}

class CHEP_Exam_Database {
    public static function install_tables() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chep_exam_results';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            candidate_name VARCHAR(191) NOT NULL,
            candidate_index VARCHAR(100) NOT NULL,
            exam_type VARCHAR(64) NOT NULL,
            station_number INT(11) DEFAULT 0,
            score_percentage DECIMAL(5,2) NOT NULL,
            practical_score DECIMAL(5,2) DEFAULT 0.00,
            mcq_score DECIMAL(5,2) DEFAULT 0.00,
            irt_theta DECIMAL(6,3) DEFAULT NULL,
            irt_sem DECIMAL(6,3) DEFAULT NULL,
            proctoring_infractions INT(11) DEFAULT 0,
            integrity_score INT(11) DEFAULT 100,
            decision VARCHAR(32) DEFAULT 'PASS',
            certificate_hash VARCHAR(64) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY candidate_index (candidate_index),
            KEY exam_type (exam_type)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    public static function insert_result($data) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chep_exam_results';

        $insert_data = array(
            'candidate_name'         => sanitize_text_field($data['candidate_name'] ?? 'Candidate Nurse'),
            'candidate_index'        => sanitize_text_field($data['candidate_index'] ?? 'NMCN/2026/0000'),
            'exam_type'              => sanitize_text_field($data['exam_type'] ?? 'caosce'),
            'station_number'         => intval($data['station_number'] ?? 0),
            'score_percentage'       => floatval($data['score_percentage'] ?? 0),
            'practical_score'        => floatval($data['practical_score'] ?? 0),
            'mcq_score'              => floatval($data['mcq_score'] ?? 0),
            'irt_theta'              => isset($data['irt_theta']) ? floatval($data['irt_theta']) : null,
            'irt_sem'                => isset($data['irt_sem']) ? floatval($data['irt_sem']) : null,
            'proctoring_infractions' => intval($data['proctoring_infractions'] ?? 0),
            'integrity_score'        => intval($data['integrity_score'] ?? 100),
            'decision'               => sanitize_text_field($data['decision'] ?? 'PASS'),
            'certificate_hash'       => sanitize_text_field($data['certificate_hash'] ?? hash('sha256', uniqid())),
            'created_at'             => current_time('mysql'),
        );

        return $wpdb->insert($table_name, $insert_data);
    }

    public static function get_all_results($limit = 100) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chep_exam_results';
        return $wpdb->get_results($wpdb->prepare("SELECT * FROM $table_name ORDER BY created_at DESC LIMIT %d", $limit));
    }
}
