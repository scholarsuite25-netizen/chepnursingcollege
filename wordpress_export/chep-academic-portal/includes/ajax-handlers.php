<?php
/**
 * CHEP Academic Portal - AJAX Handlers
 *
 * @package CHEP_Portal
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Submit Application AJAX
add_action('wp_ajax_chep_submit_application', 'chep_handle_submit_application');
add_action('wp_ajax_nopriv_chep_submit_application', 'chep_handle_submit_application');

function chep_handle_submit_application() {
    global $wpdb;
    $table = $wpdb->prefix . 'chep_applications';

    $full_name     = sanitize_text_field($_POST['full_name'] ?? '');
    $email         = sanitize_email($_POST['email'] ?? '');
    $phone         = sanitize_text_field($_POST['phone'] ?? '');
    $program       = sanitize_text_field($_POST['program'] ?? '');
    $olevel_exam   = sanitize_text_field($_POST['olevel_exam'] ?? 'WAEC');
    $exam_year     = sanitize_text_field($_POST['exam_year'] ?? '2025');
    $credits_count = sanitize_text_field($_POST['credits_count'] ?? '5');
    $jamb_score    = sanitize_text_field($_POST['jamb_score'] ?? '');
    $rrr_number    = sanitize_text_field($_POST['rrr_number'] ?? ('RRR-' . rand(1000000000, 9999999999)));

    if (empty($full_name) || empty($email) || empty($phone)) {
        wp_send_json_error(array('message' => 'Please fill in all required fields.'));
    }

    $inserted = $wpdb->insert($table, array(
        'full_name'     => $full_name,
        'email'         => $email,
        'phone'         => $phone,
        'program'       => $program,
        'olevel_exam'   => $olevel_exam,
        'exam_year'     => $exam_year,
        'credits_count' => $credits_count,
        'jamb_score'    => $jamb_score,
        'rrr_number'    => $rrr_number,
        'status'        => 'Pending',
        'batch'         => 'Batch A-01',
        'created_at'    => current_time('mysql'),
    ));

    if ($inserted) {
        wp_send_json_success(array(
            'message'    => 'Application received successfully.',
            'rrr_number' => $rrr_number,
            'full_name'  => $full_name,
            'program'    => $program,
        ));
    } else {
        wp_send_json_error(array('message' => 'Could not save application to database.'));
    }
}

// 2. Student Credential Verification AJAX
add_action('wp_ajax_chep_verify_student', 'chep_handle_verify_student');
add_action('wp_ajax_nopriv_chep_verify_student', 'chep_handle_verify_student');

function chep_handle_verify_student() {
    global $wpdb;
    $table = $wpdb->prefix . 'chep_students';

    $query = sanitize_text_field($_POST['query'] ?? '');
    if (empty($query)) {
        wp_send_json_error(array('message' => 'No search term provided.'));
    }

    $record = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table WHERE UPPER(matric_number) = %s OR UPPER(nmcn_index) = %s",
        strtoupper($query),
        strtoupper($query)
    ));

    if ($record) {
        wp_send_json_success(array(
            'data' => array(
                'matric_number'     => $record->matric_number,
                'nmcn_index'        => $record->nmcn_index,
                'full_name'         => $record->full_name,
                'program'           => $record->program,
                'award'             => $record->award,
                'year_of_graduation'=> $record->year_of_graduation,
                'classification'    => $record->classification,
                'license_status'    => $record->license_status,
                'teaching_hospital' => $record->teaching_hospital,
                'verified_hash'     => $record->verified_hash,
            )
        ));
    } else {
        wp_send_json_error(array('message' => 'No student ledger match found.'));
    }
}
