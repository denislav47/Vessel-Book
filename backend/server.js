var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

mongoose.set('useUnifiedTopology', true);
//Creamos la conexión con mongo
mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true});

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // seteamos el puerto

var router = express.Router();   //Creamos el router de express

// Seteamos la ruta principal
router.get('/', function(req, res) {
    res.json({ message: 'Hooolaa :)'});
});

// Le decimos a la aplicación que utilize las rutas que agregamos
app.use('/', router);

// Iniciamos el servidor
app.listen(port);
console.log('Aplicación creada en el puerto: ' + port);