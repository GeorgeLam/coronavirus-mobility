const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const Post = require('../models/models');


//GET from localhost:3000/posts/api   :
router.get("/api/", jsonParser, async(req, res) =>{
    try{
        const allPosts = await Post.find({
          sub_region_1: "Swindon",
          date: "20/03/20"
        }).select(
          "sub_region_1 date retail_and_recreation_percent_change_from_baseline"
        );
        res.send(allPosts);
    } catch(err){
        res.json({msg: err}) 
    }
});

router.post("/api/", jsonParser, async(req, res) => {
    //let data = req.body;
    //console.log(req.body);

    // const post = new Post({
    //     chosenArea: req.body.chosenArea,
    //     type: req.body.type
    // });

    //console.log(post);

    // post.save()
    // .then(data =>{
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json( {message: err} );
    // });

    let typeNames = [
      "retail_and_recreation_percent_change_from_baseline",
      "grocery_and_pharmacy_percent_change_from_baseline",
      "parks_percent_change_from_baseline",
      "transit_stations_percent_change_from_baseline",
      "workplaces_percent_change_from_baseline",
      "residential_percent_change_from_baseline"
    ];
    let searchingType = typeNames[req.body.type];
    console.log(req.body.type);
    console.log(searchingType);


    try{
        const allPosts = await Post.find({
          sub_region_1: req.body.chosenArea,
          //date: "20/03/20"
        }).select(
          `sub_region_1 date ${searchingType}`
        );
        res.send(allPosts);
    } catch(err){
        res.json({msg: err}) 
    }
});

module.exports = router;