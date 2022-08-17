<?php
// include my db
include_once PROJECT_ROOT_PATH . '/db.php';

class BooksController extends BaseController {
    protected $library = null;

    public function __construct() {
        try {
            $this->library = new Database();
        } catch (Error $e) {
            die('Failed to build library : ' . $e->getMessage());
        }

        return $this->library;
    }

    public function getBooks() {
        $data = $this->library->fetch();

        return json_encode($data);
    }
}
?>
