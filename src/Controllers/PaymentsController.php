<?php
namespace Luna\Controllers;

use Luna\Services\PaymentsService;

class PaymentsController
{
    public function handle()
    {
        $billingId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        $service = new PaymentsService();
        return $service->process($billingId);
    }
}
