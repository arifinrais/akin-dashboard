//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


/*const MongoClient = new require('mongodb').MongoClient;
const client = new MongoClient('mongodb://mongo:admin@localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true });
console.log("tes1")

async function run() {
  try {
    console.log("tes2")
    await client.connect();
    const coll = client.db('akin-dashboard').collection('viz_patent')
    const cursor = coll.find({year:2001})
    await cursor.forEach(console.dir);
    console.log("tes2b")
  } finally {
    await client.close();
    console.log("tes3")
  }
}


run().catch(console.dir);*/

//gagal di connect karena i.unescape is not a function, katanya mongodb gabisa diakses dari browser?
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:admin@localhost:27017";
console.log("tes")
MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
  console.log("tes1")
  if (err) throw err;
  var dbo = db.db("akin-dashboard");
  var query = { year: 2018 };
  dbo.collection("viz_patent").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result["total_national"]["A"]);
    db.close();
  });
});
*/

//homepage
router.get('/', function(req, res){
  res.render('index')
});

//explore
router.get('/explore', function(req) {
  
});



module.exports = router;