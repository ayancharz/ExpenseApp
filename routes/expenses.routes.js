var express = require('express');
var router = express.Router();

const ObjectId = require('mongodb').ObjectId;

const dbo = require('../Config/mongodb.config');
const { expense } = require('../Models/expenses');

const expenseModel = require('../Models/expenses');

/* GET Expenses listing. (../expenses/*) */
router.get('/', function(req, res, next) {
  res.send('respond with an expense');
});

router.get('/getExpenses', function(req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("expenseListings")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

router.post('/addExpense', function(req, res) {

  console.log(req.body, req.body.Date)
  const expenseListing = {
    Name: req.body.Name,
    Date: new Date(req.body.Date),
    Type: req.body.Type,
    Description: req.body.Description,
    Amount: req.body.Amount,
    Category: req.body.Category
  }

  const dbConnect = dbo.getDb();
  dbConnect
    .collection("expenseListings")
    .insertOne(expenseListing, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting expenses!");
      } else {
        console.log(`Added a new expense with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

router.post('/updateExpense', function(req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("expenseListings")
    .updateOne(
      { _id: ObjectId(req.body._id) },
      {
        $set: {
          Name: req.body.Name,
          Date: new Date(req.body.Date),
          Type: req.body.Type,
          Description: req.body.Description,
          Amount: req.body.Amount,
          Category: req.body.Category
        }
      },
      function(err, result) {
        if (err) {
          res.status(400).send("Error updating the response")
        } else {
          console.log("Update succesfful")
          console.log(result)
          res.status(204).send("Updated successfully")
        }
      }
    )
});

router.delete('/deleteExpense', function(req, res) {
  console.log(req.body)
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("expenseListings")
    .remove(
      { _id: ObjectId(req.body._id) },
      function(err, result) {
        if (err) {
          res.status(400).send("Error deleting the expense")
        } else {
          console.log("Delete succesfful")
          console.log(result)
          res.status(204).send("Deleted successfully")
        }
      }
    )
});

module.exports = router