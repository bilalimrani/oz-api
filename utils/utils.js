/**
 * Created by ghazanfar on 5/15/17.
 */

"use strict"


const randomstring = require("randomstring");

/**
 * Common Methods
 */


function randomString() {


    let string = randomstring.generate();
    return string;
}

module.exports = {
    randomString : randomString
};