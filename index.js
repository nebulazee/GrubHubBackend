const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
var withAuth = require('./Middleware/middleware')

const secret = 'mysecretsshhh';

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });



app.use( bodyParser.json() );       // to support JSON-encoded bodies
/* app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); */
app.use(cookieParser())
app.post('/testToken', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    //console.log(email+' '+password);
    if (email == 'admin' && password == 'admin') {
        console.log('dd');
        const payload = { email };
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: false });
          /*   .sendStatus(200);
          res.json(JSON.stringify({
              name:'Aishwarya',
              email: email
          }))  */
          
          res.end('done'); 
    }
});
app.get('/api/secret', withAuth, function (req, res) {
    res.send('The password is potato');
})
app.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
})

var port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log('app is listening at port 3001');
})