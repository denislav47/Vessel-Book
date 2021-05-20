var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();

var router = express.Router(); 
//NO ME GUSTA NADA CORS - PROBAR CON ROUTER EXPRESS 
app.use(cors());
app.use(bodyParser.json());

router.get('/small, smaller');

var posts = [
    {message: 'hello'},
    {message: 'bb'}
]

app.get('/posts', (req,res) => {
    res.send(posts);
})

app.post('/register', (req,res) => {
    console.log(req.body);
})

app.listen(3000);