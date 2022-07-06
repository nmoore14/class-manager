/*
* Theme toggle switch
*/
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }   

    setHeaderImage();
    updateGradientColors();
}

// General method calls
toggleSwitch.addEventListener('change', switchTheme, false);

/*
* Main conversion logic
*/
let tempType = "Celcius";
const tempTitle = document.getElementsByClassName('js-oppo-temp');

console.log(tempTitle);

tempTitle.textContent(tempType);
