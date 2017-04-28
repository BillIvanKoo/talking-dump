var User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var Token = require('../models/token');

var method = {}

method.signup = (req, res)=>{
  User.findOne({
      username : req.body.username
    }
  )
  .then ((user)=>{
    if(!user){
      if (req.body.username.length=0 || req.body.password.length < 6){
        res.send('Password must at least contain 6 characters')
      } else {
        User.create({
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
  User.findOne({username: user.username}).then((user)=>{
    let newToken = jwt.sign({
      username: user.username
    },'secret',{ expiresIn: '1h' })
    Token.create({
      token : newToken
    }).then(()=>{
      res.redirect('/tags/' + user.username)
    })
  })
}
method.logout = function(req,res){
  let broughtUsername = req.params.username
  Token.find().then((tokens)=>{
    for(let i = 0; i<tokens.length; i++){
      jwt.verify(tokens[i].token, 'secret', function(err,decoded){
        if(broughtUsername===decoded.username){
          Token.find({ token: tokens[i].token }).remove().exec();
        }
      })
    }
    res.redirect('/')
  })
}


module.exports = method
