<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <!-- Load CSS -->
        <link rel="stylesheet" href="styles/main.css">

        <!-- Icon links -->
        <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>

        <title>Nick Moore | Project 2</title>
    </head>
    <body>
        <header class="header-main">
            <div class="header-title">
                <h1 class="header-lowercase gradient-text">Temp Conversion</h1>
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
                <p class="tagline">
                    Form Style Conversion:
                </p>
                <ul class="temp-form-description">
                    <li>Enter the starting temperature</li>
                    <li>Select if it is (F)ahrenheit or (C)elsius</li>
                    <li>Click convert and watch the Nest device display</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="form-conversion">
                    <form class="conversion">
                        <div class="form-controls">
                            <fieldset class="form-control form-temp-input">
                                <input type="number" name="form-temp" value="0" class="temp-input" id="form-temp"> 
                            </fieldset>
                            <fieldset class="form-control form-temp-type">
                                <label for="fahrenheit">
                                    <input type="radio" name="form-type" value="fahrenheit" class="form-radio" id="fahrenheit" checked>
                                    <span class="iconify" data-icon="mdi:temperature-fahrenheit"></span>
                                </label>
                                <label for="celsius">
                                    <input type="radio" name="form-type" value="celsius" class="form-radio" id="celsius">
                                    <span class="iconify" data-icon="mdi:temperature-celsius"></span>
                                </label>
                            </fieldset>
                                <input type="submit" name="submit-temp" value="Convert" class="btn submitTemp" onclick="calcTemp(event)">
                        </div>
                    </form>
                    <div class="conversion-display">	
                        <div class="nest" id="dg-card-2">
                            <div class="innerCircle" id="nest-circle">
                                <h2 class="conversion-title" id="conversion"></h2>
                                <h3 class="conversion-subtitle" id="conversion-subtitle"></h3>
                                <svg width="300" height="500" id="nest-arch">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stop-color="#ff00ff" id="nest-gradient-start" />
                                            <stop offset="100%" stop-color="#8000ff" id="nest-gradient-end" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M 30 350 C 30 350, 150 475, 270 350" stroke="url(#gradient)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="auto-conversion">
                    <h1 class="auto-conversion-title">Auto Conversion</h1>
                    <p class="tagline">Enter you temp in one of the boxes below, they will update after enter press</p>
                    <p class="tagline"><small>Using the up/down arrows will auto-update</small></p>
                    <div class="inner-auto-conversion">
                        <div class="fahrenheit">
                            <input type="number" name="fahrenheit" value="0" class="temp-input auto-input" id="fahrenheit-temp">
                            <label for="fahrenheit-temp">
                                <span class="iconify" data-icon="mdi:temperature-fahrenheit"></span>
                            </label>
                        </div>
                        <div class="conversion-symbol">
                            <span class="iconify" data-icon="akar-icons:arrow-right-left"></span>
                        </div>
                        <div class="celsius">
                            <input type="number" name="celsius" value="0" class="temp-input auto-input" id="celsius-temp">
                            <label for="celsius-temp">
                                <span class="iconify" data-icon="mdi:temperature-celsius"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
        </footer>
        <script src="js/main.js"></script>
    </body>
</html>
