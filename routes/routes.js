const express = require('express');
const router = express.Router();
const packageRoutes = require('./packageRoutes');

router.use('/packages', packageRoutes);

module.exports = router;