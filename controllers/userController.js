var userModel = require('../models/user')
var passHash = require('password-hash')
const jwt = require('jsonwebtoken');

var methode = {}

methode.signup = (req, res, next)=>{
  userModel.findOne({
    where : {
      username : req.body.username
    }
  })
  .then ((query)=>{
    if(!query){
      userModel.create({
        name : req.body.name,
        username : req.body.username,
        password : passHash.generate(req.body.password)
      })
      .then(()=>{
        res.render('index')
      })
    }else{
      res.send('Username already exists')
    }
  })
};

methode.login = (username, password, callback)=>{
  userModel.findOne({
      username : username
  })
  .then((query)=>{
    if(passHash.verify(password, query.password)){
      var myToken = jwt.sign({name : query.name, username : query.username}, 'secret', {expiresIn : '1h'});
      callback(null,{token : myToken})
    }else{
      callback(null,"gagal")
    }
  })
}

module.exports = methode
