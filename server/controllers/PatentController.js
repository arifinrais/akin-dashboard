var model = require('../providers/modelProvider');
var dbURI = 'mongodb://mongo:admin@localhost:27017';

async function run() {
  const MongoClient = new require('mongodb').MongoClient;
  const client = new MongoClient(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("tes1")
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

//run().catch(console.dir); //dimasukin ke exports dibawah

exports.default = (req,res) => {
  var focusRec = req.query.focus;
  if (focusRec == 'ipr') {
    //ambil database
    //transform ke model Treemap
    //res json
  } else {
    //ambil database
    var rootDatum = new model.TreeMap({
      //map dari database document ke treemap
    });
    //res.json
  }
    //if req.query.focus == ipr
    // default ipr
    //else default region
}

exports.nationalshare = (req, res) => {

}

exports.overtime = (req, res) => {

}

exports.treemap = (req, res) => {

}

exports.geomap = (req, res) => {

}
/*
const MongoClient = new require('mongodb').MongoClient;
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

run().catch(console.dir);

//gagal di connect karena i.unescape is not a function, katanya mongodb gabisa diakses dari browser?
var MongoClient = require('mongodb').MongoClient;
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
