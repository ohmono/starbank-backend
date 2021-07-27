// import JSON management functions
const { saveAccountData,
    getAccountData } = require('../DB/account.DB');
// library to generate a random unique ID 
const crypto = require('crypto');


// create one account
function create_account(req, res) {
    var accounts = getAccountData()
    var newId = crypto.randomBytes(8).toString("hex");
    var accountType = req.body.account_type
    delete req.body.account_type
    accounts[`${accountType}_${newId}`] = Object.assign({}, req.body, {
        "transactions": [],
        "isActive": false,
        "balance": 0
    });
    saveAccountData(accounts);
    res.send({ success: true, msg: 'account created successfully' })
}

// get all accounts
function view_all_accounts(req, res) {
    var accounts = getAccountData()

    res.send(accounts)
}

// get one account by id
function view_one_account(req, res) {
    var id = req.params.id
    var account = getAccountData()[id]

    res.send(account)
}

// update one account by id
function update_account(req, res) {
    var id = req.params.id;
    var accounts = getAccountData();

    accounts[id] = req.body;
    saveAccountData(accounts);
    res.send(`accounts with id ${id} has been updated`);
}

// delete one account by id
function delete_account(req, res) {
    var id = req.params.id;
    var accounts = getAccountData();

    delete accounts[id];
    saveAccountData(accounts);
    res.send(`accounts with id ${id} has been deleted`)

}

// export route controllers
module.exports = {
    create_account,
    view_all_accounts,
    view_one_account,
    update_account,
    delete_account
};