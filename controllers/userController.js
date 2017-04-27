var userModel = require('../models/user')
var passHash = require('password-hash')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var method = {}

method.signup = (req, res)=>{
  userModel.findOne({
      username : req.body.username
    }
  )
  .then ((user)=>{
    if(!user){
      if (req.body.username.length=0 || req.body.password.length < 6){
        res.send('Password must at least contain 6 characters')
      } else {
        userModel.create({
          name : req.body.name,
          username : req.body.username,
          password : bcrypt.hashSync(req.body.password,10)
        })
        .then(()=>{
          res.redirect('/')
        })
      }
    }
    else{
      res.send('Username already exists')
    }
  })
};

method.createToken = (req,res)=>{
  let user = req.user
  userModel.findOne({username: user.username}).then((user)=>{
    res.send(jwt.sign({
      username: user.username
    },'secret',{ expiresIn: '1h' }))
  })
}

module.exports = method
