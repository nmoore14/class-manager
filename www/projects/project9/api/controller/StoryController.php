<?php
class StoryController extends BaseController {
    /**
    * "/story/build" Endpoint -> Build the selected story
    */
    public function buildStory() {
        $story = $_POST['story-file'];
        $words = array_slice($_POST, 1);
        $dir = './templates/';
        $story_path = $dir . $story;

        try {
            $story_lines = $this->buildStoryLines($story_path, $words);
            $responseData = json_encode($story_lines);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage() . 'Something went wrong.';
            $strErrorHeader = 'HTTP/1.1 500 Internal server error.';
        }

        // Send the output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array(
                    'error', $strErrorDesc
                )),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function buildStoryLines($story_path, $words) {
        $story = fopen($story_path, "r");
        $story_lines = array();

        if ($story) {
            while (($line = fgets($story)) !== false) {
                foreach ($words as $word => $value) {
                    $temp_str = '<%' . $word . '%>';
                    $temp_value = '<span class="mad-word">' . $value . '</span>';
                    $line = str_replace($temp_str, $temp_value, $line);
                }
                array_push($story_lines, $line);
            }
        }

        fclose($story);

        return $story_lines;
    }
}
?>
