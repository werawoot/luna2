<?php
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testTrue()
    {
        $this->assertTrue(true);
    }

    public function testConfigSample()
    {
        $config = require __DIR__ . '/../config/config.sample.php';
        $this->assertArrayHasKey('db_host', $config);
    }
}
