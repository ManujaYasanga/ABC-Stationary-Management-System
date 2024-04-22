const express = require('express');
const { AddItems, RemoveItems, EditItems, ViewStocks, AddStocks, ReleaseStocks } = require('../controllers/item.controller');
const router = express.Router();


router.post('/add-item', AddItems)
router.delete('/remove-item/:id', RemoveItems)
router.get('/view-stocks/:id', ViewStocks)
router.put('/edit-item', EditItems)
router.put('/add-stocks', AddStocks)
router.put('/release-stocks', ReleaseStocks)

module.exports = router;