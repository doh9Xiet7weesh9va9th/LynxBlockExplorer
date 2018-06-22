var express = require('express');
var controller = require('../controllers/explorer.controller');

const router = express.Router();

router.get('/summary', controller.getSummary);
router.get('/getlasttxs/:min', controller.getLastTransactions);
router.get('/connections', controller.getPeerConnections);
router.get('/getdistribution', controller.getDistribution);

module.exports = router;