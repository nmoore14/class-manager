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
function calcTemp(ogTempType, temp) {
    if (ogTempType === 'celsius') {
        // Set fahrenheit value
        let newTemp = (temp - 32) * 5/9;
        document.getElementById('fahrenheit-temp').value = Math.round(newTemp * 100) / 100;
    }
    if (ogTempType === 'fahrenheit') {
        // Set celsius value
        let newTemp = (temp * 9/5) + 32;
        document.getElementById('celsius-temp').value = Math.round(newTemp * 100) / 100; 
    }
}

document.querySelectorAll('.temp-input').forEach(tempInput => {
    tempInput.addEventListener('change', (e) => {
        calcTemp(e.target.name, e.target.value);
    })
})
