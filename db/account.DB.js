// path to JSON DB
const dataPath = './DB/JSON/accounts.json'
// library local file management
const fs = require('fs');

// util functions 

function saveAccountData(data) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

function getAccountData() {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

// export JSON management functions
module.exports = {
    saveAccountData,
    getAccountData
};
