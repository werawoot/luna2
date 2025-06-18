<?php
namespace Luna\Services;

class DevicesService
{
    public function listDevices()
    {
        $repo = new \Luna\Repositories\DevicesRepository();
        $devices = $repo->all();
        return ['devices' => $devices];
    }
}
