var express    = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

var app = express();

mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.set('useCreateIndex', true);

var typeModel = require('../models/type.model');

var jsonParser = bodyParser.json()

router.get('/', function(req,res){
    typeModel.find( function(err, doc){
        if (err) {
            next(err);
        }else{
            res.send(doc);
        }
    })
})

router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

module.exports = router;