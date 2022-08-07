<?php
require __DIR__ . "/bootstrap.php";

// Load the API controller(s)
require PROJECT_ROOT_PATH . "/controller/StoriesController.php";
require PROJECT_ROOT_PATH . "/controller/StoryController.php";

// Build my api paths array
$api_paths = array('stories', 'story');

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
$storiesController = new StoriesController();
$storyController = new StoryController();

if ($uri_api_path == 'stories') {
    $strMethodName = $uri_api_method . "Stories";
    $storiesController->{$strMethodName}();
}

if ($uri_api_path == 'story') {
    $strMethodName = $uri_api_method . "Story";
    $storyController->{$strMethodName}();
}
?>
