
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

var db;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

MongoClient.connect("mongodb://balajimitosis:root@ds137090.mlab.com:37090/my_database", function(err,database){
  if(err)
     return console.error(err);
  db = database;
  app.listen(3000,function(){
    console.log("running at 3000");
    });
});


app.get("/", function(req,res){
  var cursor = db.collection("Quotes").find().toArray(function(err, results){
 res.render("index.ejs",{Quotes:results});
  //console.log(results);
  });

  //res.sendFile(__dirname + "/index.html");

});

 app.post("/Quotes", function(req,res){
   db.collection("Quotes").save(req.body, function(err, result){
     if(err) return console.error(err);

     console.log("saved to database");
     res.redirect("/");
   });
});

 app.put("/Quotes", function(req,res){
   db.collection("Quotes").findOneAndUpdate(
   {
       name:"Ralph Waldo Emerson"
    },
    {
      $set:{
        name:req.body.name,
        Quote:req.body.Quote
      }
    },
    {
      sort:{_id:-1},
      upsert:true
    },
    function (err,result){
      if(err) res.send(err);
      res.send(result);
    });
 });

 app.delete("/Quotes", function(req, res) {
   db.collection("Quotes").findOneAndDelete({name: req.body.name},
   function(err, result) {
     if (err) return res.send(500, err)
     res.send("balaji quote got deleted")
     })
 })
