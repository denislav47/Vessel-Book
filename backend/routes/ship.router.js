
var express    = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

var app = express();

mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

var shipModel = require('../models/ship.model');

var jsonParser = bodyParser.json()

router.get('/', function(req,res){
    shipModel.find( function(err, doc){
        if (err) {
            next(err);
        }else{
            res.send(doc);
        }
    })
})

router.get('/:id', function(req,res,next){
    console.log(req.body)
    let shipId = req.params.id;
    shipModel.findById(shipId, function(err, data){
        if (err) {
            next(err);
        }else{
            res.json(data);
        }
    })
})

router.post('/', jsonParser , function(req,res,next){    
    let ship = req.body;
    console.log(ship);
    shipModel.create(ship,function(err, data){
        if (err) {
            next(err);
        }else{
            res.json(data);
        }
    })
})

router.put('/:id', function(req,res){
    let shipId = req.params.id;
    let ship = req.body;
    console.log(req.body, shipId);

    shipModel.findByIdAndUpdate(shipId, ship, function(err,updatedData){
        if (err) {
            next(err);
        }else{
            res.json(updatedData);
        }
    })
})

router.delete('/:id', function(req,res){
    let shipId = req.params.id;
    shipModel.findOneAndDelete(shipId, function(err, deletedData){
        if (err) {
            next(err);
        }else{
            res.json(deletedData);
        }
    })
})



router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

module.exports = router;