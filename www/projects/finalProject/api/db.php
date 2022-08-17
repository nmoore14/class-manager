<?php
// include our configs
include_once 'config.php';

// Build the DB class and its methods
class Database extends Config {
    // Fetch all from db
    public function fetch() {
        $sql = 'SELECT * FROM books';
        $req = $this->conn->prepare($sql);
        $req->execute();
        $rows = $req->fetchAll();

        return $rows;
    }
}
?>
