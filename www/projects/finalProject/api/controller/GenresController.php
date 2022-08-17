<?php
// include my db
include_once PROJECT_ROOT_PATH . '/db.php';

class GenresController extends BaseController {
    protected $library = null;

    public function __construct() {
        try {
            $this->library = new Database();
        } catch (Error $e) {
            die('Failed to build library : ' . $e->getMessage());
        }

        return $this->library;
    }

    public function getGenres() {
        $data = $this->library->fetch('Genres');

        // Send the output
        if ($data) {
            $this->sendOutput(
                json_encode($data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array(
                    'error'
                )),
                array('Content-Type: application/json', 'error')
            );
        }
    }
}
?>
