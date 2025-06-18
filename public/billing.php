<?php
include_once("../api/config.php");
require_once __DIR__ . '/../api/database.php';
require_once __DIR__ . '/../src/Repositories/BillingRepository.php';

use Luna\Repositories\BillingRepository;

$repo = new BillingRepository();
$bills = $repo->getAll();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Luna - Billing</title>
</head>
<body>
    <h1>Billing</h1>
    <table border="1">
        <tr><th>ID</th><th>Amount</th><th>Status</th></tr>
        <?php foreach ($bills as $bill): ?>
        <tr>
            <td><?php echo (int)$bill['id']; ?></td>
            <td><?php echo htmlspecialchars($bill['amount']); ?></td>
            <td><?php echo htmlspecialchars($bill['status']); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
