// path to JSON DB
const dataPath = './DB/JSON/'
// library local file management
const fs = require('fs');

// util functions 

function saveAccountData(data, account_type) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath + account_type + '_accounts.json', stringifyData)
}

function getAccountData(account_type) {
    const jsonData = fs.readFileSync(dataPath + account_type + '_accounts.json')
    return JSON.parse(jsonData)
}

// export JSON management functions
module.exports = {
    saveAccountData,
    getAccountData
};
