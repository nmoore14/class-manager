const data = document.getElementById('data-input');
const dataOutput = document.getElementById('data-output');

function validateData(item) {
    if (item.includes(',')) {
        return `"${item}"`;
    } 

    return item;
}
function convertData() {
    let ogData = data.value;
    splitData = ogData.split(';');

    let newData = splitData.map(validateData);

    dataOutput.innerText = newData.join(',');
}
