
var express    = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

var app = express();

mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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
    console.log('hola bb POST')
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

router.put('/:id',jsonParser, async function(req,res,next){
    const filter = { _id: req.params.id };
    const update = req.body;
    console.log(update, filter)
    await shipModel.findOneAndUpdate(filter, update, {new: true}, function(err,data){
        if (err) {
            next(err);
        }else{
            res.json(data);
        }
    });

})

router.delete('/:id', function(req,res){
    let shipId = req.params.id;
    console.log(req.params)
    shipModel.findOneAndRemove({_id:shipId}, function(err, deletedData){
        if (err) {
            next(err);
        }else{
            console.log(deletedData)
            res.json(deletedData);
        }
    })
})



router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

module.exports = router;