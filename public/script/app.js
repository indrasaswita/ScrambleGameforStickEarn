/*
require('./config/vue.config');
var Vue = require('./vue/vue.common');

var godhand = require("./controller/godhand")(Vue);
var Gameshow = require("./controller/gameshow")(Vue, godhand);*/

require("angular");
require("angular-resource");
require("angular-route");
//require("angular-cookie");
//require("angular-sanitize");

var app = require("./controller/init.js");


require("./config/_config.js")(app);
require("./controller/_godhand.js")(app);
require("./controller/_gameshow.js")(app);