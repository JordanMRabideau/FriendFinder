var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT)
})