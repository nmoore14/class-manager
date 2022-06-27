<?php
require __DIR__ ."/bootstrap.php";

// Load API Controllers
require PROJECT_ROOT_PATH . "/controller/ChapterContentController.php";
require PROJECT_ROOT_PATH . "/controller/ProjectContentController.php";

$api_paths = array('chapters', 'projects');

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$uri = explode('/', $uri);

$uri_api_path = $uri[3];
$uri_api_method = $uri[4];

if((isset($uri[3]) && !in_array($uri_api_path, $api_paths)) || !isset($uri[4])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// Initialize API controllers
$chapterFeedController = new ChapterContentController();
$projectFeedController = new ProjectContentController();

if ($uri_api_path == 'chapters') {
    $strMethodName = $uri_api_method . "Chapters";
    $chapterFeedController->{$strMethodName}();
}

if ($uri_api_path == 'projects') {
    $strMethodName = $uri_api_method . "Projects";
    $projectFeedController->{$strMethodName}();
}

?>
