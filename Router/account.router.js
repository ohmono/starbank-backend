// create the account router
const express = require("express");
const accountRoutes = express.Router();
// import route controllers 
const { create_account,
  view_all_accounts,
  view_one_account,
  update_account,
  delete_account } = require("../controllers/account.controller");


// create one account 
accountRoutes.post('/account', (req, res) => {
  create_account(req, res);
});

// get all accounts
accountRoutes.get('/accounts', (req, res) => {
  view_all_accounts(req, res);
});

// get one account by id
accountRoutes.get('/account/:id', (req, res) => {
  view_one_account(req, res);
});

// update one account by id
accountRoutes.put('/account/:id', (req, res) => {
  update_account(req, res);
});

//delete one account by id
accountRoutes.delete('/account/:id', (req, res) => {
  delete_account(req, res);
});

module.exports = accountRoutes;