
/**
 * Created by ghazanfar on 5/12/17.
 */

var express = require('express');
var router = express.Router();

const configuration = require('../../../config')();
let baseURL  = configuration.baseURL;

var UserController = require('../controller/user');
/*var Auth = require('../../components/auth');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/media/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({storage: storage});*/


router.post('/mobile/register', UserController.register);
router.post('/mobile/signin', UserController.signin);
router.post('/mobile/facebook', UserController.facebookRegistration);
router.post('/mobile/signout', UserController.signout);
router.post('/mobile/forget_password', UserController.forgetPassword);
router.post('/mobile/change_password',UserController.change_password);
router.post('/mobile/read_logs',UserController.readLogs);
module.exports = router;