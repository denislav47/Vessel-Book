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

router.post('/', jsonParser , function(req,res,next){
    let ship = req.body;
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
    shipModel.findOneAndRemove({_id:shipId}, function(err, deletedData){
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