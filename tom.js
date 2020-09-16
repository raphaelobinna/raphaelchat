var express = require('express');
var todoController  = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000

//static files
app.use( express.static('./public'));

//fire controllers
todoController(app);



//listen to port
app.listen(PORT);
console.log('You are listening to port 3000');