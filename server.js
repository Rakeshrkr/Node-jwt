var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var secureRoutes = express.Router();


var dataController = require('./server/controllers/data-controller');
var authenticateController = require('./server/controllers/authenticate-controller');
process.env.SECRET_KEY = "raku";
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use('/secure-api',secureRoutes);

// var config = require('./server/config/config.js');
// config.setConfig();

mongoose.connect('mongodb://jwt:jwt@ds113650.mlab.com:13650/jwt');


app.get('/api/authenticate',authenticateController.authenticate);
app.get('/api/get-data',dataController.getData);

secureRoutes.use(function(req,res,next){
var token = req.body.token || req.headers['token'];
if(token){
  jwt.verify(token,process.env.SECRET_KEY,function(err,decode){
    if(err) res.status(500).send("Invalid token");
    else next();
  })
}else{
  res.send("please send a token");
}

})

secureRoutes.post('/post-data',dataController.postData);


app.listen(2000,function(){
  console.log("sever is on at port 2000..")
})
