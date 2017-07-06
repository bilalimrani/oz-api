var express = require('express');
var router = express.Router();



var addAmbassadorController = require('../controller/ambassador');

router.post("/mobile/addnewambassador",addAmbassadorController.addNewAmbassador);
router.post("/mobile/updateambassador",addAmbassadorController.updateAmbassador);
router.post("/mobile/getambassadorprofile",addAmbassadorController.getAmbassadorProfile);
router.post("/mobile/ambassador_availibility",addAmbassadorController.ambassadorAvalibility);
module.exports = router;