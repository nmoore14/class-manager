<?php
// include our configs
include_once 'config.php';

// Build the DB class and its methods
class Database extends Config {
    // Fetch all from db
    public function fetch($table) {
        $sql = '';

        switch ($table) {
            case 'Books':
                $sql = 'SELECT b.id,
                    b.title,
                    b.page_count,
                    b.read,
                    b.description,
                    a.id AS author_id,
                    a.first_name AS author_first_name,
                    a.last_name AS author_last_name,
                    g.id AS genre_id,
                    g.title AS genre_title,
                    g.description AS genre_description
                    FROM Books b
                    LEFT JOIN Authors a 
                        ON b.author = a.id
                    LEFT JOIN Genres g 
                        ON b.genre = g.id;';
                break;
            case 'Authors':
                $sql = 'SELECT * FROM ' . $table . ';';
                break;
            case 'Genres':
                $sql = 'SELECT * FROM ' . $table . ';';
                break;
        }

        $req = $this->conn->prepare($sql);
        $req->execute();
        $rows = $req->fetchAll();

        return $rows;
    }
}
?>
