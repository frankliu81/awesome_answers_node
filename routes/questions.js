// require her e looks inside our node_modules folder to find express
var express = require("express");
var router = express.Router();
var Question = require("../models/question");

// Similar to Sinatra
// JS is asynchronous => need callbacks for order
router.get("/new", function(req, res, next){
  //res.end("Hello World!");
  res.render("questions/new", {errors: []});
});

router.post("/", function(req,res) {
  //console.log(req.body);
  //res.end("created!");
  // end for now to see that it works

  var question = new Question({title: req.body.title, body: req.body.body});
  question.save(function(err, question){
    if(err) {
      console.log(err);
      //res.end("failure");
      res.render("questions/new", {errors: err.errors});
    } else {
      console.log(question);
      //res.end("success");
      res.redirect("/questions/" + question._id)
    }
  });
});

router.get("/:id", function(req, res){
  Question.findOne({_id: req.params.id}, function(err, question) {
    if(err) {
      res.render("error", {message: "Question not found!", error: {status: 404}});
    } else {
      res.render("questions/show", {question: question})
    }
  });
});

// every time we want to require a file in app.js, it must have the exports at the end
module.exports = router;
