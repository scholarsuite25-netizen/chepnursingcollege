<?php
/**
 * CHEP Academic Portal - Database Schema & Seeder
 *
 * @package CHEP_Portal
 */

if (!defined('ABSPATH')) {
    exit;
}

function chep_create_portal_tables() {
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    // 1. Applications Table
    $table_applications = $wpdb->prefix . 'chep_applications';
    $sql_applications = "CREATE TABLE IF NOT EXISTS $table_applications (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        full_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(100) NOT NULL,
        program varchar(255) NOT NULL,
        olevel_exam varchar(50) DEFAULT 'WAEC',
        exam_year varchar(20) DEFAULT '2025',
        credits_count varchar(20) DEFAULT '5',
        jamb_score varchar(50) DEFAULT '',
        status varchar(50) DEFAULT 'Pending' NOT NULL,
        rrr_number varchar(100) NOT NULL,
        batch varchar(50) DEFAULT 'Batch A-01',
        PRIMARY KEY  (id),
        UNIQUE KEY rrr_number (rrr_number)
    ) $charset_collate;";

    // 2. Verified Students Table
    $table_students = $wpdb->prefix . 'chep_students';
    $sql_students = "CREATE TABLE IF NOT EXISTS $table_students (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        matric_number varchar(100) NOT NULL,
        nmcn_index varchar(100) NOT NULL,
        full_name varchar(255) NOT NULL,
        program varchar(255) NOT NULL,
        award varchar(255) NOT NULL,
        year_of_graduation varchar(50) DEFAULT '',
        classification varchar(100) DEFAULT '',
        license_status varchar(100) DEFAULT 'Active & Valid' NOT NULL,
        teaching_hospital varchar(255) DEFAULT '',
        verified_hash varchar(255) NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY matric_number (matric_number),
        UNIQUE KEY nmcn_index (nmcn_index)
    ) $charset_collate;";

    // 3. Clinical Logbook Table
    $table_logs = $wpdb->prefix . 'chep_clinical_logs';
    $sql_logs = "CREATE TABLE IF NOT EXISTS $table_logs (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        student_name varchar(255) NOT NULL,
        matric_number varchar(100) NOT NULL,
        hospital_unit varchar(255) NOT NULL,
        shift_date date NOT NULL,
        hours int(11) DEFAULT 8,
        procedure_notes text NOT NULL,
        preceptor_signed tinyint(1) DEFAULT 0,
        preceptor_name varchar(255) DEFAULT '',
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql_applications);
    dbDelta($sql_students);
    dbDelta($sql_logs);

    // Seed Sample Data
    chep_seed_sample_students();
}

function chep_seed_sample_students() {
    global $wpdb;
    $table_students = $wpdb->prefix . 'chep_students';

    $count = $wpdb->get_var("SELECT COUNT(*) FROM $table_students");
    if ($count == 0) {
        $wpdb->insert($table_students, array(
            'matric_number'     => 'CHEP/NUR/2024/0119',
            'nmcn_index'        => 'NMCN/RN/2024/04881',
            'full_name'         => 'Blessing Folashade ADEDIRAN',
            'program'           => 'Basic Nursing (3 Years General Nursing)',
            'award'             => 'Registered Nurse (RN) Certificate',
            'year_of_graduation'=> '2024',
            'classification'    => 'Distinction (Honours)',
            'license_status'    => 'Active & Valid',
            'teaching_hospital' => 'State Hospital Ota & OOUTH Sagamu',
            'verified_hash'     => '0x89f2a71d4b68e90c2134aa89e4729104b901fc4e'
        ));

        $wpdb->insert($table_students, array(
            'matric_number'     => 'CHEP/NUR/2025/0842',
            'nmcn_index'        => 'NMCN/STU/2025/09210',
            'full_name'         => 'Ifeoluwa Ayomide OSENI',
            'program'           => 'Basic Nursing (ND/HND Track)',
            'award'             => 'In-Course Student Nurse Candidate',
            'year_of_graduation'=> 'Expected 2027',
            'classification'    => 'Year 2 Clinical Roster',
            'license_status'    => 'Provisional Indexing',
            'teaching_hospital' => 'State Hospital Ota (Adult Surgical Ward)',
            'verified_hash'     => '0x12c49a0b8923de11f00a2938475bb910472eec99'
        ));

        $wpdb->insert($table_students, array(
            'matric_number'     => 'CHEP/ALUM/2024/004',
            'nmcn_index'        => 'NMCN/RM/2024/11094',
            'full_name'         => 'Chidinma Grace OKAFOR',
            'program'           => 'Post-Basic Midwifery (18 Months)',
            'award'             => 'Registered Midwife (RM) Diploma',
            'year_of_graduation'=> '2024',
            'classification'    => 'Upper Credit Pass',
            'license_status'    => 'Active & Valid',
            'teaching_hospital' => 'Olabisi Onabanjo Univ Teaching Hospital (OOUTH)',
            'verified_hash'     => '0x9923bbfae091172839401cc928174aa719003841'
        ));
    }
}
