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
* to fahrenheit: (F -32) x 5/9
*/
var tempToConvertTo = 'celsius';

function calcCels(temp) {
    let newTemp = (temp - 32) * 5/9;
    return Math.round(newTemp * 100) / 100;
}

function calcFah(temp) {
    let newTemp = (temp * 9/5) + 32;
    return Math.round(newTemp * 100) / 100;
}

function updateTemp(ogTempType, temp) {
    if (ogTempType === 'celsius') {
        // Set fahrenheit value
        document.getElementById('fahrenheit-temp').value = calcFah(temp);
    }
    if (ogTempType === 'fahrenheit') {
        // Set celsius value
        document.getElementById('celsius-temp').value = calcCels(temp); 
    }
}

function updateFormConversionHeader(ogTempType) {
    if (ogTempType === 'celsius') {
        tempToConvertTo = 'fahrenheit';
    } else {
        tempToConvertTo = 'celsius';
    }
}

function calcTemp(e) {
    e.preventDefault();
    const ogTemp = document.getElementById('form-temp').value;
    let newTemp = 0;
    let tempRating = 'cold';

    if (tempToConvertTo === 'fahrenheit') {
        newTemp = calcFah(ogTemp);
        if (newTemp > 32) {
            tempRating = 'hot';
        }
    }

    if (tempToConvertTo === 'celsius') {
        newTemp = calcCels(ogTemp);
        if (newTemp > 0) {
            tempRating = 'hot';
        }
    }

    newTemp = `${newTemp}&deg;`;

    document.getElementById('conversion').innerHTML = newTemp;
    document.getElementById('conversion-subtitle').innerText = tempToConvertTo;
    changeGradient(tempRating);
}

// Form conversion setup
document.querySelectorAll('.form-radio').forEach(radio => {
    radio.addEventListener('click', (e) => {
        updateFormConversionHeader(e.target.value);
    })
})

// Auto conversino section setup
document.querySelectorAll('.auto-input').forEach(tempInput => {
    tempInput.addEventListener('change', (e) => {
        updateTemp(e.target.name, e.target.value);
    })
})

/*
* DOM sytle manipulations
*/
const nestGradientStart = document.getElementById('nest-gradient-start');
const nestGradientEnd = document.getElementById('nest-gradient-end');

function changeGradient(tempRating) {
    let tempStartColor = '#326BBB';
    let tempEndColor = '#0047AB';

    if (tempRating === 'hot') {
        tempStartColor = '#DC143C';
        tempEndColor = '#9A0E2A';
    }

    nestGradientStart.setAttribute('stop-color', tempStartColor);
    nestGradientEnd.setAttribute('stop-color', tempEndColor);
}
