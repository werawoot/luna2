<?php
namespace Luna\Controllers;

use Luna\Services\NotificationsService;

class NotificationsController
{
    public function handle()
    {
        $service = new NotificationsService();
        return $service->getNotifications();
    }
}
