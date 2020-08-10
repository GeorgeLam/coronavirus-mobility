const express = require ('express');
const { response } = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
require('dotenv/config');
//require('dotenv').config({ path: '.env' });


const postRoute = require('./routes/posts');
app.use('/posts', postRoute);

//const Post = require('../Node/routes/models');
//const router = express.Router();
//const { MongoClient } = require('mongodb');
portNum = process.env.PORT || 5000
app.listen(portNum, () => console.log(`Listening on ${portNum}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
//app.use(bodyParser.json());
//app.use("/", router);

async function run(){
    await mongoose.connect(
        process.env.DB_Conn,
        {useNewUrlParser: true, 
        useUnifiedTopology: true},
        ()=>{console.log("Connected to DB")})
};

run();

//    //const db = client.db("test");


//    //const sw = await model.find({'sub_region_1': "Swindon"})
//    //console.log(sw);
//    // const Customer = mongoose.model('Customer', customerSchema);

//     // Find all customers
//     //const docs = await Customer.find();
//     //console.log(docs);
// }

// //run();


// router.route("/fetch").get(function (req, res) {
//   Post.find({}, function (err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send("Hello")
//       res.send(result);
//     }
//   });
// });  