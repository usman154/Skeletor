
function substitute(url, data) {
    let formattedData = url.replace(/{(\w+)}/g, function (_, key) {
        return data[key] ? data[key] : `{${key}}`;
    });
    return formattedData;
}


function arrayToObject(array) {
    let object = {};
    array.forEach(function (item) {
        let key = Object.keys(item)[0]; //take the first key from every object in the array
        object[key] = item[key]; //assign the key and value to output obj
    });
    return object;
}

function processIntegrationSettings(data) {
    if (data) {
        let array = [];
        data.map(d => {
            let obj = {};
            obj[d.key] = d.value; // map key attribute value as key and value attribute value as its value
            array.push(obj);
        });
        return arrayToObject(array);
    } else {
        return data
    }
}


const FormatTemplateString = {
}

export default FormatTemplateString;