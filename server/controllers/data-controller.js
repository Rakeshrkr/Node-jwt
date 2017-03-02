var Person = require('../models/person.js');

module.exports.getData = function(req,res){
  Person.find({},function(err,people){
    if(err) throw err ;
    res.json({data :people});
  })
}

module.exports.postData = function(req,res){
  console.log(req.body);
  var person = new Person(req.body);
  person.save(function(err){
    if(err) return res.status(500).send("coundnt save the user");
    res.status(200).send("saved successfully");
  })

}
