require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const router = require('./server/router/router');
const connection = require('./server/db/db');
connection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', router);
app.use('/', require('./server/router/memroute'));


app.listen(port, () => console.log(`server started on http://localhost:${port}`));