<?php
class StoryController extends BaseController {
    /**
    * "/story/build" Endpoint -> Build the selected story
    */
    public function buildStory() {
        var_dump($_SERVER['DOCUMENT_ROOT']);


        $story_id = $_POST["story-id"];
        $words = array_slice($_POST, 1);

        var_dump($words);
    }
}
?>
