var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connect('localhost:27017/headlinefinal');
var Schema = mongoose.Schema;
var app = express();

var Headline = require('./models/Headline');

app.use(function(req,res,next){
	
    req.db = db;
    next();
});


app.get("/write",function(req,res){
var newHeadLine = new Headline({
	headline:'This is my headline'
	});

newHeadLine.save(function (err) {
  if (err) return handleError(err);
	});
res.send("Saved new headline")
});

app.use(express.static(__dirname + "/public"))

app.get('/startgame',function(req,res){
        res.sendFile(__dirname + "/public/index.html")
    });

/*Setting up an api to retrieve all headlines from the database.
Made very simple by using mongooses find method which returns
all the entries. function passed in for error handling and sending
response as json*/
app.get("/api/headlines",function(req,res){
	Headline.find(function(err,headlines){
		if(err){
			res.send(err);
		}
	res.json(headlines)
	});
});

/*Grabbing a single headline from the database via 
mongoose's "findbyid" convinience function*/
app.get("/api/headlinebyid/:id",function(req,res){
	Headline.findById(req.params.id,function(err,headline){
		if(err){
			res.send(err);
		}
		res.send(headline);
	});
});

/*Grabbing a document at random from the database*/
app.get("/api/headlineatrandom",function(req,res){
	var leftHeadLine = {};
	var rightHeadLine = {}
	Headline.random(function(err,headline){
		if(err){
			res.send(err);
		}
		res.send(headline);
	});
});

/*Using the api to create a new DB entry and post it to the database.*/
app.post("/api/headlines",function(){
	Headline.create({
		headline:req.body.headline,
		date:req.body.date
	},function(err){
		if(err)
			res.send(err);
	});

});

app.listen(3000);
console.log("Server running on port 3000");

