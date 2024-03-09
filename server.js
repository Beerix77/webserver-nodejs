
// web server => map a path to some code:
// app.verb( path, callback )

//console.log(`Hello Backend!!!`);


const express = require('express');

const app = express();

const PORT = 3333;

//Use ejs for templating
const ejs = require('ejs');
app.set('view-engine', ejs); // Render templates in views/ folder



app.listen( PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



// default path
app.get('/', ( req, res) => { // res,req provided by 'express'
  
  console.log('Homepage selected....'); // terminal
  res.send('Hello Browser!!!'); // send to browser

}); // GET /




//DYNAMIC ROUTES:
//=========================================
// BROWSER: parameter
// locatlhost:3333/search/guitars

app.get('/search/:subject', (req, res) => {

  console.log(`You are searching for ${req.params.subject}`);
  res.send(`RESULTS for: ${req.params.subject}`)

}); // GET /search/:subject





//////////////////////////////////////////////////////////////
// BROWSER:  multiple parameters
// localhost:3333/hello/Andrew/mood/happy

app.get('/hello/:name/mood/:mood', (req, res) => {

  //res.send(req.params) //JSON
  res.send(`<h2>Hello ${req.params.name} you are ${req.params.mood.toUpperCase()}<h2>`);

}); // GET /hello/:name/mood/:mood





////////////////////////////////////////////////////////////
// BROWSER: adding a querystring with ERROR(403)
// localhost:3333/movies/123?api_key=secret&criteria=none

app.get( '/movies/:id', (req, res) => {

  if (req.query.api_key === undefined){
    res.sendStatus(403) // Forbidden ERROR code
    return;
  }

  res.send(`Querying DB for movie with id: ${req.params.id}, API key is: ${req.query.api_key}`)
  console.log(`QueryString:`, req.query); // Terminal object

});


