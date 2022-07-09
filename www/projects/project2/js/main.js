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
}

// General method calls
toggleSwitch.addEventListener('change', switchTheme, false);

/*
* Main conversion logic
* to celsius: (C x 9/5) + 32
* to farhrenheit: (F -32) x 5/9
*/
function calcTemp(tempType, temp) {
    if (tempType === 'celsius') {
        return (temp * 9/5) + 32;
    }
    if (tempType === 'farhrenheit') {
        return (temp - 32) * 5/9;
    }
}
