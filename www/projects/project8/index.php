<?php
$data = $_POST;

function buildCSV($data) {
    $csv_string = "";
    foreach ($data as $cust_info) {
        $csv_string .= $cust_info . ",";
    }

    return $csv_string;
}

if (count($data) > 1) {
    buildCSV($data);
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

        <title>Nick Moore | Project 8</title>
    </head>
    <body>
        <header class="header-main">
            <div class="header-title">
                <h1 class="header-lowercase gradient-text">ACME Inc.</h1>
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
            <div class="main-header">
            </div>
            <div class="flex flex-col-ac main-form">
                <form action="" method="POST" id="cust-info-form" class="flex flex-col-ac cust-info-form">
                    <fieldset class="fieldset-header">
                        <h1>Customer Information</h1>
                    </fieldset>
                    <fieldset class="flex flex-row-ac flex-gap-1" id="customer-company-info">
                        <input type="text" name="customer-company" placeholder="Company" required>
                        <input type="text" name="customer-position" placeholder="Position">
                    </fieldset>
                    <fieldset class="flex flex-row-ac flex-gap-1" id="customer-name-info">
                        <input type="text" name="customer-firstname" placeholder="First Name" required>
                        <input type="text" name="customer-lastname" placeholder="Last Name" required>
                    </fieldset>
                    <fieldset class="flex flex-col-ac flex-gap-1" id="customer-address-info">
                        <div class="flex flex-row-rc flex-gap-1 fieldset-item">
                            <input type="text" name="customer-address-2" placeholder="Address 2">
                            <input type="text" name="customer-address-1" placeholder="Address" required>
                        </div>
                        <div class="flex flex-row-rc flex-gap-1 fieldset-item">
                            <input type="text" name="customer-city" placeholder="City" required>
                            <input type="text" name="customer-state" placeholder="State" required>
                            <input type="text" name="customer-zip" placeholder="Zip Code" required>
                        </div>
                    </fieldset>
                    <fieldset class="flex flex-col-ac">
                        <textarea name="customer-notes" cols="80" rows="10" placeholder="Enter customer notes here..."></textarea>
                    </fieldset>
                    <fieldset class="flex flex-row-rc flex-gap-1">
                        <input type="reset" name="customer-info-reset" class="btn btn-ghost-error" value="CLEAR">
                        <input type="submit" name="customer-info-submit" class="btn" value="Submit">
                    </fieldset>
                </form>
            </div>
        </main>
        <footer>
            <div class="footer-left">
                <h3 class="footer-title">Nick Moore | Project 8 | 2022</h3> 
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
