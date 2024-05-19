const express = require('express');
const router = express.Router();
const detailsController = require('./detailsController');


router.post('/create', detailsController.createDetail);


router.delete('/delete/:id', detailsController.deleteDetail);


router.put('/update/:id', detailsController.updateDetail);

router.get('/', detailsController.getAllDetails);

module.exports = router;
