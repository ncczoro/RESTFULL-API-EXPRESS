var express = require('express');
var jwt = require('../jsonWebToken/jwt');
var router = express.Router();

/* GET users listing. */
router.get('/', aunthenticate);

router.get('/token', jwt.verifyJWT);
router.post('/token', jwt.createJWT);

function aunthenticate(req, res, next) {
  res.send('respond authenticate with a resource');
}

module.exports = router;
