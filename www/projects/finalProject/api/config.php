<?php
class Config {
    // DB Details
    private const DBHOST = 'ksshosting.com';
    private const DBNAME = 'ksshost1_nmoore70709';
    private const DBUSER = 'ksshost1_nmoore70709';
    private const DBPASS = 'nm4326!!2022';

    // Data source
    private $dbs = 'mysql:host=' . self::DBHOST . ';dbname=' . self::DBNAME . '';

    // DB Connection
    protected $conn = null;

    // Constructor
    public function __construct() {
        try {
            $this->conn = new PDO($this->dbs, self::DBUSER, self::DBPASS);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            var_dump($this->dbs);
            die('Connection Failed : ' . $e->getMessage());
        }

        return $this->conn;
    }

    // Clean and Sanitize the data
    public function clean_input($data) {
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        $data = stripslashes($data);
        $data = trim($data);

        return $data;
    }

    // Convert to JSON
    public function message($content, $status) {
        return json_encode(['message' => $content, 'error' => $status]);
    }
}
?>
