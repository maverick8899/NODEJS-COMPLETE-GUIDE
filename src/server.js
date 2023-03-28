const path = require('path');
const express = require('express');
const morgan = require('morgan');

const route = require('./routes');

//Create Server
const app = express();
//Logger Detailed information req
app.use(morgan('combined'));

//set Template Views Dynamic
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Read File Static
app.use(express.static(path.join(__dirname, 'public')));
//Compile data urlencoded & Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

app.listen(3000);
