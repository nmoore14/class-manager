<?php
class StoriesController extends BaseController {
    /**
    * "/stories/all" Endpoint -> Get all stories available
    */
    public function listStories() {
        $stories = array(
            array(
                "id"=>0,
                "title"=>"",
                "type"=>"funny", 
                "words"=>array(
                    "noun1", "verb1", "adjective1", "noun2"
                )
            ),
            array(
                "id"=>1,
                "title"=>"",
                "type"=>"horror", 
                "words"=>array(
                    "noun1", "verb1", "adjective1", "verb2", "adjective2"
                )
            ),
        );

        // Set the array to a JSON object to send to frontend
        try {
            $responseData = json_encode($stories);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage() . ': Somethine went wrong.';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
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

    public function getStories() {
        try {
            $dir = "./templates";
            $dir_content = scandir($dir);
            $story_files = array();
            $id = 0;

            foreach($dir_content as $content) {
                if ($content != '.' && $content != '..' && $content != '.DS_Store') {
                    if (strpos($content, '.txt')) {
                        $story_info = array(
                            'id' => $id,
                            'title' => $content,
                            'words' => $this->getStoryInfo($content),
                        );
                        array_push($story_files, $story_info);
                        $id += 1;
                    }
                }
            }

            $responseData = json_encode($story_files);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong.';
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

    public function getStoryInfo($title) {
        try {
            $story_path = "./templates/" . $title;
            $story = fopen($story_path, "r");
            $story_words = array();

            if ($story) {
                while (($line = fgets($story)) !== false) {
                    $word = $this->getStoryWords($line);
                    array_push($story_words, $word);
                }
            }

            fclose($story);
            return $story_words;
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong.';
            $strErrorHeader = 'HTTP/1.1 500 Internal server error.';
        }
    }

    function getStoryWords($line) {
        if (preg_match_all('/<%(.*?)%>/', $line, $match)) {
            $words = array_unique($match[1]);
            return array_values($words);
        }
    }
}
?>
