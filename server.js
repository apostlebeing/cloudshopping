const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const port=8080;

const app = express();

//VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'client')));

//BODY PARSER MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api', tasks);

 app.listen(port, function(){
     console.log('Server started on port ' + port)
 })
