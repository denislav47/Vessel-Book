var express    = require('express');

var port = process.env.PORT || 3000; 

var app = express();    

var shipsRouter = require('./routes/ships-routes.js');

app.get('/', function(req,res){
    res.send(jsonData)
    console.log('ola bb')
})


app.use(function(err,req,res,next){
    if(err){
        res.status(500).send(err);
    }
})



// Iniciamos el servidor
app.listen(port, console.log("server listening on port ",port));
