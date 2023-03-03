var express = require('express');
var router = express.Router();

const ObjectId = require('mongodb').ObjectId;

const dbo = require('../Config/mongodb.config');
const { expense } = require('../Models/expenses');

const expenseModel = require('../Models/expenses');

/* GET Expenses listing. (../expense-data/*) */
router.get('/', function(req, res, next) {
    res.send('respond with expense data');
});

router.get('/getByYear', function(req, res) {
    const dbConnect = dbo.getDb();
    console.log(req.query.year)
  
    dbConnect
      .collection("expenseListings")
      .find({
        Date: {
            $gte: new Date(req.query.year+"-01-01"),
            $lte: new Date(req.query.year+"-12-31")
        }
      })
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
    });
});

router.get('/getByMonthAndYear', function(req, res) {
    const dbConnect = dbo.getDb();
    var monthTo
    var monthFrom
    var yearTo
    var yearFrom

    var error
    //Add Month and Year range API in the same fn with query params
    if (req.query.monthTo && req.query.monthFrom) {
        if (checkParams(req.query.monthFrom, req.query.monthTo, 12)) {
            monthTo = req.query.monthTo
            monthFrom = req.query.monthFrom
        } else {
            error = "Please check your parameters"
        }
        
    } else if (req.query.month) {
        monthTo = req.query.month
        monthFrom = req.query.month
    } else {
        error = "Please provide correct params"
    }

    if (req.query.yearTo && req.query.yearFrom) {
        if (checkParams(req.query.yearFrom, req.query.yearTo)) {
            yearTo = req.query.yearTo
            yearFrom = req.query.yearFrom
        } else {
            error = "Please check your parameters"
        }
    } else if (req.query.year) {
        yearTo = req.query.year
        yearFrom = req.query.year
    } else {
        error = "Please provide correct params"
    }

    
  
    if (!error) {
        dbConnect
        .collection("expenseListings")
        .find({
            Date: {
                $gte: new Date(yearFrom+"-"+monthFrom+"-01"),
                $lte: new Date(yearTo+"-"+monthTo+"-31")
            }
        })
        .toArray(function (err, result) {
            if (err) {
            res.status(400).send("Error fetching listings!");
            } else {
            res.json(result);
            }
        });
    } else {
        res.status(400).send(error)
    }
});

function compareIntLesserOrEqual(x, y) {
    if (parseInt(x) <= parseInt(y)) {
        return true
    } 
    return false
}

function checkParams(x, y, maxValue) {
    if (maxValue && (parseInt(x) > maxValue || parseInt(y) > maxValue)) {
        return false
    }
    if (parseInt(x) <= 0 && parseInt(y) <= 0) {
        return false
    }
    if (parseInt(x) <= parseInt(y)) {
        return true
    } 
    return false
}

module.exports = router