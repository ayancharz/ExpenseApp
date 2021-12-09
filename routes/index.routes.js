//Router to route the request to different path as per the Http requests

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expense Sheets' });
});

router.post('/addExpense', function(req, res) {
  res.send('Hello from Post');
})

module.exports = router;
