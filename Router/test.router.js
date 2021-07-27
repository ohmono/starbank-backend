// create the account router
const express = require("express");
const testRoutes = express.Router();
const { create_random_accounts } = require('../controllers/test.controller')

testRoutes.get('/test/:number', (req, res) => {
    console.log(req.params.number);
    create_random_accounts(req, res)
});
module.exports = testRoutes;