
// web server => map a path to some code:
// app.verb( path, callback )

//console.log(`Hello Backend!!!`);


const express = require('express');

const app = express();

const PORT = 3333;

//Set up a static/assets folder whose contents are "passed through" to the browser directly, without needing to define a custom route ie app.get(....)'

app.use(express.static('public')); // express 'middleware'

//Handle POSTed form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Use ejs for templating
const ejs = require('ejs');
app.set('view-engine', ejs); // Render templates in views/ folder (setting up ejs into 'app'
//app.get(): uses express.js
//app.set(): configures express to use ejs



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




////////////////////////////////////////////////////////////
// BROWSER: using ejs as a HTML templating system
// localhost:3333/dogs?name=Fido
app.get('/dogs/', (req, res) => {

  console.log(`Dogs website selected...`);

  res.render('dogIndex.ejs', {
    dogName: req.query.name,
    age: Math.floor(Math.random() * 10)

  });

});



////////////////////////////////////////////////////////////
// BROWSER: using an API
// localhost:3333/dogs?name=Fido

//JSON
app.get('/api/dogs', (req, res) => {
  //NB: In a real API, this data would come from a DataBase query.
  const dogIndex = [
    {name: 'Fido', age: 1},
    {name: 'Scoot', age: 4},
    {name: 'Rex', age: 2},
    {name: 'Leia', age: 7},
  ];

  res.json(dogIndex);

});





app.post('/dogs/add', (req, res) => {

  console.log(req.body); // see as object in Terminal
  res.send('Form submitted.');
  //res.redirect('/xxx'); // Redirect after form submit. Avoids user reloading the page and resubmitting
  
});




// default generic route (error handler)
app.use ( (req, res) => {
  res.send(`Oops, looks like there's nothing here!`)
});
















