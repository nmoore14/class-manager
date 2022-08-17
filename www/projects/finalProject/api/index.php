<?php
require __DIR__ . "/bootstrap.php";

// Load the API controller(s)
require PROJECT_ROOT_PATH . "/controller/BooksController.php";
require PROJECT_ROOT_PATH . "/controller/AuthorsController.php";
require PROJECT_ROOT_PATH . "/controller/GenresController.php";

// Build my api paths array
$api_paths = array('books', 'authors', 'genres');

// Parse the URI
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$uri = explode('/', $uri);

$api_index = array_search("api", $uri);

$uri_api_path = $uri[$api_index + 2];
$uri_api_method = $uri[$api_index + 3];

if((isset($uri[3]) &&!in_array($uri_api_path, $api_paths)) || !isset($uri[4])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// Initialize API controllers
$booksController = new BooksController();
$authorsController = new AuthorsController();
$genresController = new GenresController();

if ($uri_api_path == 'books') {
    $strMethodName = $uri_api_method . "Books";
    $booksController->{$strMethodName}();
}

if ($uri_api_path == 'authors') {
    $strMethodName = $uri_api_method . "Authors";
    $authorsController->{$strMethodName}();
}

if ($uri_api_path == 'genres') {
    $strMethodName = $uri_api_method . "Genres";
    $genresController->{$strMethodName}();
}
?>
