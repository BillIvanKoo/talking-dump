var Tag = require('../models/tag')
var Token = require('../models/token')

let getTags=function(req,res){
  let broughtUsername = req.params.username
  console.log(broughtUsername);
  Tag.find().then((tags)=>{
    res.render('tagoptions.ejs', {tags:tags, username:broughtUsername})
  })
}

module.exports= {getTags}