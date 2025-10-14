const express = require('express');
const router = express.Router();
// const sequelize = require('../config/db');
// const User = require('../models/User');
// const Categories = require('../models/Categories');
// const Exchange_Rate = require('../models/Exchange_Rate');
// const Transaction = require('../models/Transaction');

router.get("/", async (req , res) => {
    res.send("User router çalışıyor.");
});
module.exports = router;