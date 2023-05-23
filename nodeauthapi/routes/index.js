var express = require('express');
const app = require('../app');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to the api'
  });
});

router.post('/posts', verifyToken ,function(req, res, next){

  jwt.verify(req.token, 'secretkey', function (err, authData){

    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post Created...',
        authData
      });
    }

    /*try {
      
      res.json({
        message: 'Post Created...',
        authData
      });

    } catch (err) {
      res.sendStatus(403);
    }*/

  });
});

router.post('/login', function (req, res, next) {
  //mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' } ,function(err, token) {

    res.json({
      token
    });
    

    /*try {
      res.json({
        token
      });
      
    } catch (err) {
      res.sendStatus(403);
    }*/
  });
});

function verifyToken(req,res,next){

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
 
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();

  } else {
    res.sendStatus(403); 
  }

}

module.exports = router;
