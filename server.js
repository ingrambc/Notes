//Dependencies
var express = require('express');
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//routing files
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

//start server Listener
app.listen(PORT, function(req, res) {
  console.log("App is listening on port "+PORT);
});
