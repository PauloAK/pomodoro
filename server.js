'use strict';

const express = require('express');

const PORT = 3000;
const HOST = '127.0.0.1';

const app = express();
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/index')
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`)
});