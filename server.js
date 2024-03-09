
//console.log(`Hello Backend!!!`);


const express = require('express');

const app = express();

const PORT = 3333;

app.listen( PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// web server => map a path to some code:
// app.verb( path, callback )

// default path
app.get('/', ( req, res) => { // res,req provided by 'express'
  
  console.log('Homepage selected....'); // terminal
  res.send('Hello Browser!!!'); // send to browser

});


// dynamic routes
app.get ('/search/:subject', (req, res) => {

  console.log(`You are searching for ${req.params.subject}`);
  res.send(`RESULTS for: ${req.params.subject}`)

});