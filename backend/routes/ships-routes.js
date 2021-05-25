var shipsRouter = require('express').Router();

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

var port = process.env.PORT || 3000; 



mongoose.connect('mongodb://localhost:27017/dbTest1', {useNewUrlParser: true, useUnifiedTopology: true});


var shipsSchema = new mongoose.Schema({
    objeto: String,
    tipo: String
});

var ship = mongoose.model('ship', shipsSchema);
ship.create({
    objeto: 'cartera',
    tipo: 'mangada'
}).then(function(err,ship){
    
    console.log(ship)
    console.log('aqui toooooooooooooooooy')
    console.log(err) 
});

shipsRouter.get('/ships', function(req,res){
    res.send(jsonData)
    console.log('ola bb')
})

shipsRouter.get('/ship/:id', function(req,res){
    res.send(jsonData)
    console.log('ola bb')
})

shipsRouter.post('/ship', function(req,res){
    res.send(req);
    console.log('ola puto')
})

shipsRouter.put('/ship/:id', function(req,res){
    
})

shipsRouter.delete('/ship/:id', function(req,res){
    
})

