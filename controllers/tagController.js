var Tag = require('../models/tag')
var Token = require('../models/token')
const axios = require('axios');

let getTags=function(req,res){
  let broughtUsername = req.params.username
  console.log(broughtUsername);
  Tag.find().then((tags)=>{
    res.render('tagoptions.ejs', {tags:tags, username:broughtUsername})
  })
}
let key = '1722fb629c05437e825bd982850dbd12';
// USE VOICE RSS API

let textSpeech = (req, res)=>{
  let str = req.body.tags; //"search" diganti sesuai name di body
  let string = str.replace(/\s/g,"%20")
  let url = 'https://api.tronalddump.io/search/quote?query='+string;
  axios.get(url)
  .then((response) => {
    quotes = response.data._embedded.quotes;
    let random = Math.floor(Math.random()*response.data.count);
    var quote = quotes[random].value;
    var quoteToSpeach = quote.replace(/\s/g,"%20")

    let urlRSS = 'http://api.voicerss.org/?key='+key+'&hl=en-us&src='+quoteToSpeach;
    res.render('speech', {quote : quote, url : urlRSS, username: req.params.username});
  })
}
module.exports= {getTags, textSpeech}