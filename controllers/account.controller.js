// import JSON management functions
const { saveAccountData,
    getAccountData } = require('../DB/account.DB');
// library to generate a random unique ID 
const crypto = require('crypto');


// create one account
function create_account(req, res) {
    var account_type = req.body.account_type
    var accounts = getAccountData(account_type)
    var newId = crypto.randomBytes(8).toString("hex");
    delete req.body.account_type
    accounts[newId] = Object.assign({}, req.body, {
        "transactions": [],
        "isActive": false,
        "balance": 0
    });
    saveAccountData(accounts, account_type);
    res.send({ success: true, msg: 'account created successfully' })
}

// get all saving accounts
function view_all_saving_accounts(req, res) {
    var accounts = getAccountData('saving')

    res.send(accounts)
}

// get all saving accounts
function view_all_current_accounts(req, res) {
    var accounts = getAccountData('current')

    res.send(accounts)
}

// get one account by id
function view_one_account(req, res) {
    var id = req.params.id
    var accounts = Object.assign({}, getAccountData('current'), getAccountData('saving'))
    var account = accounts[id]
    res.send(account)
}

// update one account by id
function update_account(req, res) {
    var id = req.params.id;

    function search_update(id, account_type) {
        var accounts = getAccountData(account_type);
        for (const key of Object.keys(req.body)) {
            accounts[id][key] = (req.body[key])
        }
        saveAccountData(accounts, account_type);
        res.send(`accounts with id ${id} has been updated`);
    }

    if (getAccountData('current')[id]) {
        var account_type = 'current'
        return search_update(id, account_type);
    }
    else if (getAccountData('saving')[id]) {
        var account_type = 'saving'
        return search_update(id, account_type);
    }
    else {
        res.send(`accounts with id ${id} not exist`);
    }
}

// delete one account by id
function delete_account(req, res) {
    var id = req.params.id;

    function search_delete(id, account_type) {
        var accounts = getAccountData(account_type);
        delete accounts[id]
        saveAccountData(accounts, account_type);
        res.send(`accounts with id ${id} has been deleted`);
    }

    if (getAccountData('current')[id]) {
        var account_type = 'current'
        return search_delete(id, account_type);
    }
    else if (getAccountData('saving')[id]) {
        var account_type = 'saving'
        return search_delete(id, account_type);
    }
    else {
        res.send(`accounts with id ${id} not exist`);
    }

}

// export route controllers
module.exports = {
    create_account,
    view_all_saving_accounts,
    view_all_current_accounts,
    view_one_account,
    update_account,
    delete_account
};