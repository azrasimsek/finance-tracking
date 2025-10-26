const express = require('express');
const router = express.Router();
const index = require('../models/index');
// const sequelize = require('../config/db');

//user ana route
router.get("/", async (req , res) => {
    res.send("User router çalışıyor.");
});


module.exports = router;