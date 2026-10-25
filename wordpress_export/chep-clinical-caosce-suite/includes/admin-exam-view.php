<?php
/**
 * Admin view for CHEP Exam Suite audit logs
 */

if (!defined('ABSPATH')) {
    exit;
}

$results = CHEP_Exam_Database::get_all_results(100);
?>

<div class="wrap">
    <h1 class="wp-heading-inline">CHEP Clinical Examination Academy • Candidate Results &amp; Audit Logs</h1>
    <hr class="wp-header-end" />

    <div style="background: #fff; padding: 20px; border-radius: 12px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <h2>Institutional CAOSCE &amp; IRT Examination Records</h2>
        <p>Real-time audit log of student candidate performance across the 6-station CAOSCE circuit, 3PL IRT Adaptive testing, and biometric proctoring telemetry.</p>

        <?php if (empty($results)): ?>
            <div class="notice notice-info inline" style="margin: 20px 0;">
                <p>No candidate examination attempts recorded yet. Results will appear here automatically when students complete stations in the <a href="<?php echo esc_url(home_url('/exams')); ?>" target="_blank">Examination Portal</a>.</p>
            </div>
        <?php else: ?>
            <table class="wp-list-table widefat fixed striped table-view-list" style="margin-top: 15px;">
                <thead>
                    <tr>
                        <th style="width: 60px;">ID</th>
                        <th>Candidate Name</th>
                        <th>NMCN Index Number</th>
                        <th>Modality</th>
                        <th>Score</th>
                        <th>3PL Ability (&theta;)</th>
                        <th>Proctoring Integrity</th>
                        <th>Status</th>
                        <th>Certificate Hash</th>
                        <th>Completed At</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($results as $row): ?>
                        <tr>
                            <td>#<?php echo esc_html($row->id); ?></td>
                            <td><strong><?php echo esc_html($row->candidate_name); ?></strong></td>
                            <td><code><?php echo esc_html($row->candidate_index); ?></code></td>
                            <td><span class="badge" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold;"><?php echo esc_html(strtoupper($row->exam_type)); ?></span></td>
                            <td><strong style="color: <?php echo $row->score_percentage >= 50 ? '#15803d' : '#b91c1c'; ?>;"><?php echo esc_html(number_format($row->score_percentage, 1)); ?>%</strong></td>
                            <td><?php echo $row->irt_theta !== null ? esc_html(number_format($row->irt_theta, 2)) : '&mdash;'; ?></td>
                            <td>
                                <span style="color: <?php echo $row->integrity_score >= 80 ? '#15803d' : '#b45309'; ?>; font-weight: bold;">
                                    <?php echo esc_html($row->integrity_score); ?>%
                                </span>
                                <?php if ($row->proctoring_infractions > 0): ?>
                                    <small style="color: #b91c1c;">(<?php echo esc_html($row->proctoring_infractions); ?> flags)</small>
                                <?php endif; ?>
                            </td>
                            <td>
                                <span style="background: <?php echo $row->decision === 'PASS' ? '#dcfce7' : '#fee2e2'; ?>; color: <?php echo $row->decision === 'PASS' ? '#166534' : '#991b1b'; ?>; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">
                                    <?php echo esc_html($row->decision); ?>
                                </span>
                            </td>
                            <td><code style="font-size: 10px;"><?php echo esc_html(substr($row->certificate_hash, 0, 16)); ?>...</code></td>
                            <td><?php echo esc_html($row->created_at); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>
