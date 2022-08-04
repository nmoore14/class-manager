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
}
?>
