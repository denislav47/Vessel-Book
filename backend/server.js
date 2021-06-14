var express    = require('express');
var router = express.Router();
var cors    = require('cors');


var port = process.env.PORT || 3000; 

var app = express();

var shipRouter = require('./routes/ship.router.js')
var typeRouter = require('./routes/type.router.js')

app.use(cors({ origin: 'http://localhost:4200' , credentials : true}));

app.use('/ship', shipRouter);
app.use('/type', typeRouter);


app.use(function(err,req,res,next){
    if(err){
        res.status(500).send(err);
    }
})



// Server start
app.listen(port, console.log("server listening on port ",port));

module.exports = router;