<?php
function story($words) {
    return <<<HTML
        <p>{$words[0]} {$words[1]} {$words[2]} towards {$words[3]}</p>
HTML;
}
?>
