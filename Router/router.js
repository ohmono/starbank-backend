const express = require("express");
const router = express.Router();
//const fs = require('fs');
const accountRoutes = require('./account.router.js');
const testRoutes = require('./test.router');

router.use(accountRoutes);
router.use(testRoutes);

module.exports = router;