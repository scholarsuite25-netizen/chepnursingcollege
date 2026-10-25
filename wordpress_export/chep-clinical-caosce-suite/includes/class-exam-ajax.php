<?php
/**
 * AJAX endpoints for CHEP Exam Suite
 */

if (!defined('ABSPATH')) {
    exit;
}

class CHEP_Exam_AJAX {
    public static function init() {
        add_action('wp_ajax_chep_submit_exam_result', array(__CLASS__, 'handle_submit_result'));
        add_action('wp_ajax_nopriv_chep_submit_exam_result', array(__CLASS__, 'handle_submit_result'));

        add_action('wp_ajax_chep_log_proctoring_infraction', array(__CLASS__, 'handle_log_infraction'));
        add_action('wp_ajax_nopriv_chep_log_proctoring_infraction', array(__CLASS__, 'handle_log_infraction'));
    }

    public static function handle_submit_result() {
        check_ajax_referer('chep_exam_nonce', 'security');

        $candidate_name         = sanitize_text_field($_POST['candidate_name'] ?? 'Candidate Nurse');
        $candidate_index        = sanitize_text_field($_POST['candidate_index'] ?? 'NMCN/2026/0000');
        $exam_type              = sanitize_text_field($_POST['exam_type'] ?? 'caosce');
        $score_percentage       = floatval($_POST['score_percentage'] ?? 0);
        $station_number         = intval($_POST['station_number'] ?? 0);
        $practical_score        = floatval($_POST['practical_score'] ?? 0);
        $mcq_score              = floatval($_POST['mcq_score'] ?? 0);
        $irt_theta              = isset($_POST['irt_theta']) ? floatval($_POST['irt_theta']) : null;
        $irt_sem                = isset($_POST['irt_sem']) ? floatval($_POST['irt_sem']) : null;
        $proctoring_infractions = intval($_POST['proctoring_infractions'] ?? 0);
        $integrity_score        = intval($_POST['integrity_score'] ?? 100);
        $decision               = sanitize_text_field($_POST['decision'] ?? 'PASS');
        $certificate_hash       = sanitize_text_field($_POST['certificate_hash'] ?? hash('sha256', $candidate_index . time()));

        $record = array(
            'candidate_name'         => $candidate_name,
            'candidate_index'        => $candidate_index,
            'exam_type'              => $exam_type,
            'station_number'         => $station_number,
            'score_percentage'       => $score_percentage,
            'practical_score'        => $practical_score,
            'mcq_score'              => $mcq_score,
            'irt_theta'              => $irt_theta,
            'irt_sem'                => $irt_sem,
            'proctoring_infractions' => $proctoring_infractions,
            'integrity_score'        => $integrity_score,
            'decision'               => $decision,
            'certificate_hash'       => $certificate_hash,
        );

        $inserted = CHEP_Exam_Database::insert_result($record);

        if ($inserted) {
            wp_send_json_success(array(
                'message'          => 'Result securely recorded in institutional registry.',
                'certificate_hash' => $certificate_hash,
            ));
        } else {
            wp_send_json_error(array('message' => 'Failed to persist result.'));
        }
    }

    public static function handle_log_infraction() {
        check_ajax_referer('chep_exam_nonce', 'security');
        $candidate_index = sanitize_text_field($_POST['candidate_index'] ?? 'NMCN/2026/0000');
        $type            = sanitize_text_field($_POST['type'] ?? 'TAB_SWITCH');
        $integrity       = intval($_POST['integrity_score'] ?? 100);

        // Can log to error_log or update candidate session table
        wp_send_json_success(array('logged' => true, 'timestamp' => current_time('mysql')));
    }
}

CHEP_Exam_AJAX::init();
