<?php
class ChapterContentController extends BaseController {
    /**
    * "/chapters/all" Endpoint - Get all chapters content
    */
    public function listChapters() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $strErrorDesc = '';

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $dir = "../chapters";
                $folders = scandir($dir);
                $content = array();
    
                foreach($folders as $folder) {
                    if ($folder != '.' && $folder != '..' && $folder != '.DS_Store') {
                        $folder_dir = "../chapters/" . $folder;
                        $folder_content = scandir($folder_dir);
                        $folder_link = "./chapters/" . $folder . "/";

                        if (!in_array("index.html", $folder_content)) {
                            $folder_link = $folder_link . "sample.html";
                        }

                        $file_array = array(
                            'name' => $folder,
                            'link' => $folder_link,
                        );
                        array_push($content, $file_array);
                    }
                }

                if (count($content)) {
                    $responseData = json_encode($content);
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong.';
                $strErrorHeader = 'HTTP/1.1 500 Internal server error.';
            }
        } else {
            $strErrorDesc = 'Method not supported.';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity.';
        }

        // send the output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
?>
