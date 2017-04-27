var Tag = require('../models/tag')

let getTag=function(req,res){
  Tag.find().then((tags)=>{
    res.render('tagoptions', {tags:tags})
  })
}

module.exports= {getTag}