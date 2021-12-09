
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://ayancharz:sandbox%40123@expensecluster.lkqp3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;



module.exports = { 
    client,
    connectToServer: function (callback) {
        client.connect(function (err, db) {
          if (err || !db) {
            return callback(err);
          }
    
          dbConnection = db.db("expense-list");
          console.log("Successfully connected to MongoDB.");
    
          return callback();
        });
      },
    
      getDb: function () {
        return dbConnection;
      },
}
