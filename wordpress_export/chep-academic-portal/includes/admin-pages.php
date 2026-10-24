<?php
/**
 * CHEP Academic Portal - WordPress Admin Menus & Management
 *
 * @package CHEP_Portal
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', 'chep_register_admin_menus');

function chep_register_admin_menus() {
    add_menu_page(
        'CHEP Admissions Queue',
        'CHEP Portal',
        'manage_options',
        'chep-admissions',
        'chep_render_admissions_page',
        'dashicons-welcome-learn-status',
        25
    );

    add_submenu_page(
        'chep-admissions',
        'Admissions Queue',
        'Admissions Queue',
        'manage_options',
        'chep-admissions',
        'chep_render_admissions_page'
    );

    add_submenu_page(
        'chep-admissions',
        'Student Registry & Verification',
        'Student Registry',
        'manage_options',
        'chep-students',
        'chep_render_students_page'
    );
}

// Render Admissions Queue
function chep_render_admissions_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'chep_applications';

    // Handle Status Updates
    if (isset($_GET['action']) && isset($_GET['id']) && check_admin_referer('chep_status_action')) {
        $id = intval($_GET['id']);
        $new_status = '';
        if ($_GET['action'] === 'admit') $new_status = 'Admitted';
        elseif ($_GET['action'] === 'screen') $new_status = 'Screened';
        elseif ($_GET['action'] === 'reject') $new_status = 'Rejected';

        if ($new_status) {
            $wpdb->update($table, array('status' => $new_status), array('id' => $id));
            echo '<div class="notice notice-success is-dismissible"><p>Candidate status updated to <strong>' . esc_html($new_status) . '</strong>.</p></div>';
        }
    }

    $applications = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC LIMIT 100");
    ?>
    <div class="wrap">
        <h1 style="font-weight: 800; color: #003f1a;">CHEP College of Nursing Sciences - Admissions Queue</h1>
        <p>Review prospective nursing candidates, print screening slips, and update admission screening outcomes.</p>

        <div style="background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-top: 15px;">
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 140px;">RRR Number</th>
                        <th>Candidate Name</th>
                        <th>Programme Applied</th>
                        <th>Contact</th>
                        <th>O'Level / JAMB</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($applications)): foreach ($applications as $app): ?>
                        <tr>
                            <td><strong style="font-family: monospace; color: #055928;"><?php echo esc_html($app->rrr_number); ?></strong></td>
                            <td><strong><?php echo esc_html($app->full_name); ?></strong><br><small style="color: #64748b;"><?php echo esc_html($app->created_at); ?></small></td>
                            <td><?php echo esc_html($app->program); ?></td>
                            <td><?php echo esc_html($app->email); ?><br><?php echo esc_html($app->phone); ?></td>
                            <td><?php echo esc_html($app->olevel_exam); ?> (<?php echo esc_html($app->credits_count); ?> Credits)<br>JAMB: <?php echo esc_html($app->jamb_score ?: 'N/A'); ?></td>
                            <td>
                                <?php
                                $status_color = '#ea580c';
                                if ($app->status === 'Admitted') $status_color = '#15803d';
                                elseif ($app->status === 'Screened') $status_color = '#0284c7';
                                elseif ($app->status === 'Rejected') $status_color = '#dc2626';
                                ?>
                                <span style="background: <?php echo $status_color; ?>; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                                    <?php echo esc_html($app->status); ?>
                                </span>
                            </td>
                            <td>
                                <?php
                                $admit_url = wp_nonce_url(admin_url('admin.php?page=chep-admissions&action=admit&id=' . $app->id), 'chep_status_action');
                                $screen_url = wp_nonce_url(admin_url('admin.php?page=chep-admissions&action=screen&id=' . $app->id), 'chep_status_action');
                                ?>
                                <a href="<?php echo esc_url($screen_url); ?>" class="button button-small" style="color: #0284c7;">Screen</a>
                                <a href="<?php echo esc_url($admit_url); ?>" class="button button-small button-primary" style="background: #15803d; border-color: #15803d;">Admit</a>
                            </td>
                        </tr>
                    <?php endforeach; else: ?>
                        <tr><td colspan="7" style="text-align: center; padding: 30px;">No admission applications in the queue yet. Applications submitted from the front-end will appear here automatically.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php
}

// Render Student Registry & Verification Page
function chep_render_students_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'chep_students';

    // Handle New Student Addition
    if (isset($_POST['chep_add_student']) && check_admin_referer('chep_add_student_action')) {
        $matric = sanitize_text_field($_POST['matric_number']);
        $nmcn = sanitize_text_field($_POST['nmcn_index']);
        $name = sanitize_text_field($_POST['full_name']);
        $program = sanitize_text_field($_POST['program']);
        $award = sanitize_text_field($_POST['award']);
        $hash = '0x' . substr(md5($matric . time()), 0, 40);

        if ($matric && $name) {
            $wpdb->insert($table, array(
                'matric_number'     => $matric,
                'nmcn_index'        => $nmcn,
                'full_name'         => $name,
                'program'           => $program,
                'award'             => $award,
                'license_status'    => 'Active & Valid',
                'verified_hash'     => $hash,
                'created_at'        => current_time('mysql')
            ));
            echo '<div class="notice notice-success is-dismissible"><p>Student record added successfully for <strong>' . esc_html($name) . '</strong>.</p></div>';
        }
    }

    $students = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC");
    ?>
    <div class="wrap">
        <h1 style="font-weight: 800; color: #003f1a;">CHEP Student Registry &amp; NMCN Verification Ledger</h1>
        <p>Manage matriculated students and accredited alumni verifiable through the public <code>/verify</code> portal.</p>

        <!-- Add Student Form -->
        <div style="background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-top: 15px; margin-bottom: 25px;">
            <h3>Add New Student to Verification Registry</h3>
            <form method="post" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; align-items: end;">
                <?php wp_nonce_field('chep_add_student_action'); ?>
                <div>
                    <label><strong>Matriculation Number:</strong></label><br>
                    <input type="text" name="matric_number" required placeholder="CHEP/NUR/2026/0120" style="width: 100%;">
                </div>
                <div>
                    <label><strong>NMCN Index:</strong></label><br>
                    <input type="text" name="nmcn_index" required placeholder="NMCN/RN/2026/0991" style="width: 100%;">
                </div>
                <div>
                    <label><strong>Candidate Full Name:</strong></label><br>
                    <input type="text" name="full_name" required placeholder="Surname First Name" style="width: 100%;">
                </div>
                <div>
                    <label><strong>Programme:</strong></label><br>
                    <input type="text" name="program" value="Basic Nursing (General)" style="width: 100%;">
                </div>
                <div>
                    <label><strong>Award:</strong></label><br>
                    <input type="text" name="award" value="Registered Nurse (RN)" style="width: 100%;">
                </div>
                <div>
                    <button type="submit" name="chep_add_student" class="button button-primary" style="background: #003f1a; border-color: #003f1a; width: 100%;">Add to Registry</button>
                </div>
            </form>
        </div>

        <!-- Students Table -->
        <div style="background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Matriculation Number</th>
                        <th>NMCN Council Index</th>
                        <th>Full Name</th>
                        <th>Programme &amp; Award</th>
                        <th>Status</th>
                        <th>Verification Seal</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($students)): foreach ($students as $stu): ?>
                        <tr>
                            <td><strong style="font-family: monospace; color: #003f1a;"><?php echo esc_html($stu->matric_number); ?></strong></td>
                            <td><strong style="font-family: monospace; color: #055928;"><?php echo esc_html($stu->nmcn_index); ?></strong></td>
                            <td><strong><?php echo esc_html($stu->full_name); ?></strong></td>
                            <td><?php echo esc_html($stu->program); ?><br><small style="color: #64748b;"><?php echo esc_html($stu->award); ?></small></td>
                            <td><span style="background: #15803d; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;"><?php echo esc_html($stu->license_status); ?></span></td>
                            <td><code style="font-size: 10px;"><?php echo esc_html(substr($stu->verified_hash, 0, 18) . '...'); ?></code></td>
                        </tr>
                    <?php endforeach; else: ?>
                        <tr><td colspan="6" style="text-align: center; padding: 20px;">No students in the registry.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php
}
