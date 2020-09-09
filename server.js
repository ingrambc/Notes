//Dependencies
var express = require('express');
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(apps);


//html routes
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"))
})

//api routes


//start server Listener
app.listen(PORT, function(req, res) {
  console.log("App is listening on port "+PORT);
});
