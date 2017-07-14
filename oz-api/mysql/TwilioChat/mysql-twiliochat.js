var AccessToken = require('twilio').AccessToken;
var twilio = require('twilio');
var AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

var serverKey = 'AAAAiIVMfYw:APA91bHjyGZBOmVm0DbaGIqWx_hGlOwvIrIp1_vIzArSdfGXC_zG5_OpB3JnnmAqC3DFGI6bKKabuPqutDnD4jEcKMMlgli5DhumbG5wgqJCnQmzze0Mj-zUx-Vghavt6ucYw_e5qnu-';
var ACCOUNT_SID = 'AC66dd2217bb7590e00ed3e3b6de6d86b0';
var API_KEY_SID = 'SK57a3f01aa2ab80609a9d59f427b4934c';
var API_KEY_SECRET = 'NDHbH3ujBCe6diMiqEpd5JzrabPHso8A';
var APP_SID = 'AP15fb163f116a59de8a753dea5a147474';

const FCM = require('fcm-push');