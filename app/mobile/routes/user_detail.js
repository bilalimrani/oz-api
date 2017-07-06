/**
 * Created by ghazanfar on 5/25/17.
 */

var express = require('express');
var router = express.Router();

const configuration = require('../../../config')();
let baseURL  = configuration.baseURL;

var UserDetailController = require('../controller/user_detail');

// calling routes
router.post('/mobile/assignUserRole', UserDetailController.assignUserRole);
router.post('/mobile/ambassadorData', UserDetailController.ambassadorData);
router.get('/mobile/ambassadorFilter', UserDetailController.ambassadorFilter);
router.post('/mobile/isFavouriteAmbassador', UserDetailController.isFavouriteAmbassador);
router.post('/mobile/favouriteAmbassadorList', UserDetailController.favouriteAmbassadorList);

router.post('/mobile/veteran_verification', UserDetailController.veteran_verification);
router.post('/mobile/twilio_voice', UserDetailController.twilio_voice);
router.post('/mobile/twilio_chat', UserDetailController.twilio_chat);
router.post('/mobile/assign_username', UserDetailController.assignUserName);
router.post('/mobile/cancel_call', UserDetailController.cancel_call);
//router.post('/mobile/ambassador_filter', UserDetailController.ambassador_filter);

module.exports = router;