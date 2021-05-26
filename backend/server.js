var express    = require('express');
var router = express.Router();


var port = process.env.PORT || 3000; 

var app = express();

var shipRouter = require('./routes/ship.router.js')

var jsonData = {objeto: "cosa cara", tipo: "mangau"}



app.use('/ship', shipRouter);

app.get('/', function(req,res){
    res.send(jsonData)
    console.log('ola bb sin barco')
})


app.use(function(err,req,res,next){
    if(err){
        res.status(500).send(err);
    }
})



// Iniciamos el servidor
app.listen(port, console.log("server listening on port ",port));

module.exports = router;