<?php
$kmSpeed = $_GET['km-speed'];
$mphSpeed = 0;

if (is_numeric($kmSpeed)) {
    $mphSpeed = round($kmSpeed * 0.62137119223733, 2);
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

        <title>Nick Moore | Project 3</title>
    </head>
    <body>
        <header class="header-main">
            <div class="header-title">
                <h1 class="header-lowercase gradient-text">Speed Conversion</h1>
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
        <main>
            <div class="form-description">
                <h2>Enter the k/mh speed you'd like to see the mph for.</h2>
            </div>
            <form action="" method="GET" class="conversion">
                <fieldset>
                    <div class="form-controls">
                        <input type="number"name="km-speed" placeholder="Enter the KMH" class="kmh-input">
                        <input type="submit" value="Submit" class="btn submitKmh">
                    </div>
                </fieldset>
            </form>
            <div class="mph-display">
                <?php if ($mphSpeed) { ?>
                    <h1 class="mph-speed">
                        <?php echo $mphSpeed ?>
                    </h1>
                <?php } ?>
                <h2 class="mph-subtitle">MPH</h2>
            </div>
        </main>
        <footer>
        </footer>
        <script src="js/main.js"></script>
    </body>
</html>
