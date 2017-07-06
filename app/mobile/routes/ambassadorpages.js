var express = require('express');
var router = express.Router();

const configuration = require('../../../config')();
let baseURL  = configuration.baseURL;

var pageController = require('../controller/pages');



//page routes
router.get("/mobile/becomeambassador",pageController.getPage1);
router.get("/mobile/quessionarepage",pageController.getQuessionarePage);
router.get("/mobile/congratulationpage",pageController.getCongratulationPage);
router.get("/mobile/about_oz_page",pageController.AboutOZPage);
router.get("/mobile/terms_condition_page",pageController.termsAndCondition);
router.get("/mobile/faq_page",pageController.faq);
router.get("/mobile/setting_screen_page",pageController.seetingScreen);
router.get("/mobile/privacy_page",pageController.privacy_Policy);
//link routes
router.get("/mobile/getpage1link",pageController.getPage1link);
router.get("/mobile/getquessionarepagelink",pageController.getQuessionarePageLink);
router.get("/mobile/getcongratulationpagelink",pageController.getCongratulationPageLink);

module.exports = router;