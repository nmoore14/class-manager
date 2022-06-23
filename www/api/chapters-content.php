<?php
class BaseChaptersController {
    public function __call($dir, $arguments) {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }

    protected
}
?>
