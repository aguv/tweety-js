const express = require( 'express' );
const morgan = require('morgan'); //middleware application logger
const nunjucks = require( 'nunjucks' );
const bodyParser = require('body-parser');
const router = require('./routes');
const http = require('http');
const socketIO = require('socket.io');

const app = express(); // crea una instancia de una aplicación de express

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///

// Configurando Nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

app.use(morgan('tiny'))

app.use('/', router);




const PORT = 3000;

const server = app.listen(PORT, function(){
    console.log(`App running on port: ${PORT}`)
});

const io = socketIO(server);

io.on('connection', client => {
    client.on('newTweet', data => {
        console.log(data);
    })
})