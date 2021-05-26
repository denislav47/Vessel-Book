
var express    = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
// var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

var app = express();

// mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true, useUnifiedTopology: true});


var jsonData = {objeto: "cosa varata", tipo: "mangau"}

var jsonParser = bodyParser.json()

router.get('/', function(req,res){
    res.send(jsonData)
    console.log('ola bbbbbbbarco')
})

router.get('/:id', function(req,res){
    res.send()
    console.log(req)
})

router.post('/', jsonParser , function(req,res){
    console.log(res)
    console.log(req.body)
    res.send();
})

router.put('/:id', function(req,res){
    
})

router.delete('/:id', function(req,res){
    
})


router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

module.exports = router;



// var shipsSchema = new mongoose.Schema({
//     objeto: String,
//     tipo: String
// });

// var ship = mongoose.model('ship', shipsSchema);
// ship.create({
//     objeto: 'cartera',
//     tipo: 'mangada'
// }).then(function(err,ship){
    
//     console.log(ship)
//     console.log('aqui soooooooooooooooooy')
//     console.log(err) 
// });