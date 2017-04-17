/*This file shows a basic mongoose schema that can be imported and used in other node
projects.*/

//Grabbing the neccesary dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Declaration of the schema itself. Simple JSON blob format.
var headLineSchema = new Schema({
	headline:{type:String,required:true},
	date:Date,
	imageUrl:{type:String,required:true}
	});

//A silly little method demonstrating how easy it is to manipulate schema
headLineSchema.methods.rudify = function(){
this.headline = this.headline + "-rude"
};

headLineSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

//We don't export the schema itself, but rather the model generated from the schema.
var Headline = mongoose.model('headline',headLineSchema,"headlines")

module.exports=Headline;