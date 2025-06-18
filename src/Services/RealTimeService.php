<?php
namespace Luna\Services;

class RealTimeService
{
    public function getData()
    {
        $repo = new \Luna\Repositories\RealTimeRepository();
        $data = $repo->fetch();
        return ['usage' => $data];
    }
}
