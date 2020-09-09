//dependencies
var fs = require("fs");
var path = require("path");

//get path variables for writing file
var outDir = path.resolve(__dirname, "../db");
var outFile = path.join(outDir, "db.json");

//get array from file
var notes = [];
try {
  notes = JSON.parse(fs.readFileSync("db/db.json"));
} catch (error) {
  notes = [];
}

console.log("notes is an array: " + Array.isArray(notes));

//get a unique id
var uid = 1;
//if there is items in array, set id to 1 more than last items id
if(notes.length > 0)
  uid += notes[notes.length - 1].id;


//function to write array to file
function writeDB(array){
  //turn array to JSON STRING
  let arrayStr = JSON.stringify(array);

  //Check if directory exists
  if(!fs.existsSync(outDir))
    fs.mkdirSync(outDir);
  
  //try writing file
  try {
    fs.writeFileSync(outFile, arrayStr);
  } catch (error) {
    console.log('write error: '+ error);
  }
}

//api routes
module.exports = function(app){
  app.get("/api/notes", function(req, res){
    res.json(notes)
  });

  app.post("/api/notes", function(req, res){
    let newNote = {                 //get infor from request
      title: req.body.title,
      text: req.body.text,
      id: uid                      //set id from uid
    };
    uid ++;                         //increment uid
    notes.push(newNote);            //add new note to array
    writeDB(notes);              
    res.json(newNote);              //respond with newNote
  });

  app.delete("/api/notes/:id", function(req, res){
    let noteId = req.params.id;
    let index = -1
    for (let i = 0; i < notes.length; i++) {
      if(notes[i].id === noteId){
        index = i;
      }
    }

    let delNote = notes.splice(index, 1);
    writeDB(notes);
    res.json(delNote);
  })
}
