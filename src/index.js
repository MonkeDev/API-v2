require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { join } = require('path');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 8080;

app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.SessionSecret,
		resave: false,
		saveUninitialized: true,
	}),
);

const dashboard = require('./dashboard/index');
app.use('/dash', dashboard);


app.listen(port, () => console.log(`[Server]: On port, ${port}`));