const jwt = require('jsonwebtoken');
var Token = require('../models/token');

let jwtAuthenticate = function(req, res, next){
  let arr=[]
  let broughtUsername = req.params.username
  Token.find().then((tokens)=>{
    for(let i = 0; i<tokens.length; i++){
      jwt.verify(tokens[i].token, 'secret', function(err,decoded){
        if(broughtUsername===decoded.username){
          arr.push(broughtUsername)
          console.log(arr)
        }
      })
    }
  }).then(()=>{if(arr.length>0){
    next()
  } else {
    res.redirect('/')
  }})
  
}

module.exports = {jwtAuthenticate};