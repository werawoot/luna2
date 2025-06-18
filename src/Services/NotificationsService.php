<?php
namespace Luna\Services;

class NotificationsService
{
    public function getNotifications()
    {
        $repo = new \Luna\Repositories\NotificationsRepository();
        $items = $repo->list();
        return ['notifications' => $items];
    }
}
