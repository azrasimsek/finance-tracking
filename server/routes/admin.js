const express = require('express');
const router = express.Router();

// Route tanımlamaları
router.get('/', (req, res) => {
    res.json({ message: 'Admin routes working' });
});

// Diğer route'lar...

module.exports = router;