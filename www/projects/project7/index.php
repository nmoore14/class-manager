<?php
$data = $_POST["mail-csv-input"];
$label_data = explode(",", $data);

function buildLabel($label_data) {
    $label = '';

    $label = $label . '<p class="label-item">' . $label_data[2] . '</p>';
    $label = $label . '<p class="label-item">Attn: ' . $label_data[1] . '</p>';
    $label = $label . '<p class="label-item">' . $label_data[3] . '</p>';
    $label = $label . '<p class="label-item">' . $label_data[4] . ' ' . $label_data[5] . ', ' . $label_data[6] . '</p>';

    return $label;
}

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <!-- Load CSS -->
        <link rel="stylesheet" href="styles/main.css">

        <!-- Icon links -->
        <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>

        <title>Nick Moore | Project 7</title>
    </head>
    <body>
        <header class="header-main">
            <div class="header-title">
                <h1 class="header-lowercase gradient-text">Mailing Label Generator</h1>
            </div>
            <div class="header-actions">
                <div class="header-theme-toggle">
                    <label class="theme-switch" for="checkbox">
                        <input type="checkbox" id="checkbox" class="js-theme-checkbox"/>
                        <div class="slider round"></div>
                    </label>
                    <span class="iconify sunglasses sunglasses-color" data-icon="mdi:sunglasses"></span>
                </div>
            </div>
        </header>
        <main class="flex flex-col-ac">
            <div class="main-header">
                <p>Input your CSV string to generate the mailing label</p>
            </div>
            <div class="flex flex-col-ac main-form">
                <form action="" method="POST" id="mail-csv-form" class="flex flex-col-ac mail-csv-form">
                    <textarea name="mail-csv-input" form="mail-csv-form" cols="120" rows="10"class="mail-csv-input" placeholder="Enter CSV data here..."></textarea> 
                    <fieldset class="flex flex-row-ac mail-form-btns">
                        <input type="reset" class="btn btn-ghost-error" value="CLEAR">
                        <input type="submit" class="btn" value="Submit Data">
                    </fieldset>
                </form>
            </div>
            <?php if (count($label_data) > 1) { ?>
                <div class="flex flex-col-ac main-mail-label">
                    <div class="flex flex-col-ac mail-label-content">
                        <?php 
                            echo buildLabel($label_data);
                        ?>
                    </div>
                </div>
            <?php } ?>
        </main>
        <footer>
            <div class="footer-left">
                <h3 class="footer-title">Nick Moore | Project 7 | 2022</h3> 
            </div>
            <div class="footer-mid">
                <!-- Blank on purpose --> 
            </div>
            <div class="footer-links">
                <a href="https://github.com/nmoore14" class="footer-link" target="_blank">
                    <span class="iconify" data-icon="akar-icons:github-fill"></span>
                </a>
                <a href="https://discord.io/devrepo" class="footer-link" target="_blank">
                    <span class="iconify" data-icon="akar-icons:discord-fill"></span>
                </a>
            </div>
        </footer>
        <script src="js/main.js"></script>
    </body>
</html>
