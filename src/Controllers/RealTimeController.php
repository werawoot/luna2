<?php
namespace Luna\Controllers;

use Luna\Services\RealTimeService;

class RealTimeController
{
    public function handle()
    {
        $service = new RealTimeService();
        return $service->getData();
    }
}
