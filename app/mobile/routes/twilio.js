var express = require('express');
var router = express.Router();

const configuration = require('../../../config')();
let baseURL  = configuration.baseURL;

var UserController = require('../controller/twilio');

router.post('/mobile/voice_call', UserController.voiceCall);
router.post('/mobile/message', UserController.message);

module.exports = router;