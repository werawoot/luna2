<?php
include_once("../api/config.php");
require_once __DIR__ . '/../api/database.php';
require_once __DIR__ . '/../src/Repositories/DevicesRepository.php';

use Luna\Repositories\DevicesRepository;

$repo = new DevicesRepository();
$devices = $repo->all();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Luna - Index</title>
</head>
<body>
    <h1>Device List</h1>
    <ul>
    <?php foreach ($devices as $device): ?>
        <li><?php echo htmlspecialchars($device['name']); ?> (<?php echo htmlspecialchars($device['type']); ?>)</li>
    <?php endforeach; ?>
    </ul>
</body>
</html>
