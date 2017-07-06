var express = require('express');
var router = express.Router();
const configuration = require('../../../config')();
var favouriteAmbassadorController = require('../controller/favourite_ambassadors');

router.post('/mobile/add_to_favourite',favouriteAmbassadorController.addToFavourite);

module.exports = router;