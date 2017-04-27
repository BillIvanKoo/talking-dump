const express = require('express');
const app = express();
const axios = require('axios');

// voicerss api-key
let key = '1722fb629c05437e825bd982850dbd12';

const speech = require('@google-cloud/speech')({
  projectid: 'tronald-dump-to-speech',
  keyFilename: '/home/didit/tronald-dump-to-speech-7ea8d2b38478.json'
});

// require google translate text-to-speech
const googleTTS = require('google-tts-api');

app.listen(3000);

// Get Quotes
let quotes;
app.get('/getQuote/:search', (req, res) => {
  let string = req.params.search;
  let url = 'https://api.tronalddump.io/search/quote?query='+string;
  axios.get(url).then((response) => {
    quotes = response.data._embedded.quotes;
    res.send(response.data._embedded.quotes);
  });
});

// USE GOOGLE TRANSLATE TTS
app.use('/speech', (req, res) => {
  let quote = quotes[0].value;
  // res.send(quotes[0].value);

  googleTTS(quote, 'en', 1).then((url) => {
    res.redirect(url);
  }).catch((err) => {
    res.send(err);
  });
});



// USE VOICE RSS API
// app.use('/', (req, res) => {
//   let text = 'hello world!';
//   res.redirect('http://api.voicerss.org/?key='+key+'&hl=en-us&src='+text);
// });
