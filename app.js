const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
});

app.use('/hola', (req, res, next) => {
    console.log("WELCOME TO MY HOLA");
});


const port = process.env.PORT || 3000;

server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});