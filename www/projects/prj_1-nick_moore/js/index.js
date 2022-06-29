const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const headerImage = document.getElementById('header-image');

const headerLight = document.getElementById('header-image-light');
const headerDark = document.getElementById('header-image-dark');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

const headerImageLight = 'media/images/bg-wave-1.png';
const headerImageDark = 'media/images/bg-wave-2.png';

const gradientColor1 = document.getElementById('gradient-color-1');
const gradientColor2 = document.getElementById('gradient-color-2');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function setHeaderImage() {
    let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (theme === 'dark') {
        headerDark.classList.add('active-graphic');
        headerLight.classList.remove('active-graphic');
    } else {
        headerLight.classList.add('active-graphic');
        headerDark.classList.remove('active-graphic');
    } 
}

function updateBlobColors() {
    let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (theme === 'dark') {
        gradientColor1.setAttribute('stop-color', '#34D399');
        gradientColor2.setAttribute('stop-color', '#6D28D9');
    } else {
        gradientColor1.setAttribute('stop-color', '#EF5DA8');
        gradientColor2.setAttribute('stop-color', '#C4B5FD');
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
    updateBlobColors();
}

// General method calls
toggleSwitch.addEventListener('change', switchTheme, false);

// Methods to run on window load
window.onload = function() {
    setHeaderImage();
    updateBlobColors();
}
