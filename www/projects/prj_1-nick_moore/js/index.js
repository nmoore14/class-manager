const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const headerImage = document.getElementById('header-image');

const headerLight = document.getElementById('header-image-light');
const headerDark = document.getElementById('header-image-dark');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

const headerImageLight = 'media/images/bg-wave-1.png';
const headerImageDark = 'media/images/bg-wave-2.png';

// Blob gradient colors
const blobGradientColor1 = document.getElementById('gradient-color-1');
const blobGradientColor2 = document.getElementById('gradient-color-2');

// External link gradient colors
const iconBackgroundGradientColor1 = document.getElementsByClassName('icon-gradient-color-1');
const iconBackgroundGradientColor2 = document.getElementsByClassName('icon-gradient-color-2');


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

function updateGradientColors() {
    let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    let blobColor1 = '#EF5DA8';
    let blobColor2 = '#C4B5FD';
    let iconColor1 = '#DDD6FE';
    let iconColor2 = '#D1FAE5';

    if (theme === 'dark') {
        blobColor1 = '#34D399';
        blobColor2 = '#6D28D9';

        if (document.documentElement.clientWidth > 1112) {
            iconColor1 = '#374151';
            iconColor2 = '#000000';
        }
    }

    blobGradientColor1.setAttribute('stop-color', blobColor1);
    blobGradientColor2.setAttribute('stop-color', blobColor2);

    for (let i = 0; i < iconBackgroundGradientColor1.length; i++ ) {
        iconBackgroundGradientColor1[i].setAttribute('stop-color', iconColor1);
    }

    for (let i = 0; i < iconBackgroundGradientColor2.length; i++ ) {
        iconBackgroundGradientColor2[i].setAttribute('stop-color', iconColor2);
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

// Methods to run on window load
window.onload = function() {
    setHeaderImage();
    updateGradientColors();
}
