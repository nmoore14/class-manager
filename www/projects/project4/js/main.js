const data = document.getElementById('data-input');
const dataOutput = document.getElementById('data-output');

function convertData() {
    let newData = [];
    let ogData = data.value;
    splitData = ogData.split(';');

    for (let i = 0; i < splitData.length; i++) {
        if (splitData[i].includes(',')) {
            newData.push(`"${splitData[i]}"`);
            continue;
        }

        newData.push(splitData[i]);
    }

    dataOutput.innerText = newData.join(',');
}
