
console.log(`Hello Backend!`);


const express = require('express');

const app = express();

const PORT = 3333;

app.listen( PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// web server map a path to some code:
// app.verb( path, callback )

app.get('/', () => {
  console.log('Homepage selected....');
})



