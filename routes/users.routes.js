//We define different routers here to for specific types of api endpoints. 
//Example: this is Users endpoint (.../users)

var express = require('express');
var router = express.Router();

/* GET users listing. (../users/)*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
