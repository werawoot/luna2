<?php
namespace Luna\Controllers;

use Luna\Services\DevicesService;

class DevicesController
{
    public function handle()
    {
        $service = new DevicesService();
        return $service->listDevices();
    }
}
