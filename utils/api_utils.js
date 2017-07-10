/**
 * Created by ghazanfar on 5/15/17.
 */

"use strict"

const configuration = require('../config')();

let SENDGRID_APIKEY = configuration.sendGridApiKEY;

var helper = require('sendgrid').mail;
/**
 * Common Methods
 */


function sendMail(email,cb) {

    var fromEmail = new helper.Email('support@objectivezero.org');
    var toEmail = new helper.Email(email);
    var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', 'Hello, Email!');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(SENDGRID_APIKEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
            cb(err,null);
        }else{
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            cb(null,response);
        }

    });

}

function sendMailTest(email,data,cb) {

    var fromEmail = new helper.Email('support@objectivezero.org');
    var toEmail = new helper.Email(email);
    var subject = 'Hello please find your code to reset your password'+data.passCode;
    var content = new helper.Content('text/plain', 'Hello, Email!');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(SENDGRID_APIKEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
            cb(err,null);
        }else{
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            cb(null,response);
        }

    });

}

module.exports = {
    sendMail : sendMail,
    sendMailTest : sendMailTest
};