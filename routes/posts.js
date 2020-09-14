const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const Post = require("../models/models");

//GET from localhost:3000/posts/api - use this for creating API?   :
router.get("/api/", jsonParser, async (req, res) => {
  try {
    const allPosts = await Post.find({
      sub_region_1: "Swindon",
      //date: "20/03/20"
    }).select(
      "sub_region_1 date retail_and_recreation_percent_change_from_baseline"
    );
    res.send(allPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/api/cc", jsonParser, async (req, res) => {
  try {
    const allPosts = await Post.find({
      //sub_region_1: req.body.chosenArea,
      //date: "20/03/20"
      date: "2020-04-20",
    }).select(`country_region_code`);
    res.send(allPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

//BELOW - DO NOT CHANGE
router.post("/api/", jsonParser, async (req, res) => {
  let typeNames = [
    "retail_and_recreation_percent_change_from_baseline",
    "grocery_and_pharmacy_percent_change_from_baseline",
    "parks_percent_change_from_baseline",
    "transit_stations_percent_change_from_baseline",
    "workplaces_percent_change_from_baseline",
    "residential_percent_change_from_baseline",
  ];
  let searchingType = typeNames[req.body.type];
  console.log(searchingType);

  console.log(req.body);
  if (req.body.chosenArea == "Nationwide") {
    console.log("Searching for nationwide, so we'll use: " + req.body.cName);
    req.body.chosenArea = "";
  }
  console.log(req.body);

  try {
    const mysort = { date: 1 };
    const allPosts = await Post.find({
      country_region: req.body.cName,
      sub_region_1: req.body.chosenArea,
      sub_region_2: req.body.chosenArea2,
      //date: req.body.date
    })
      .sort(mysort)
      .select(`sub_region_1 date ${searchingType}`);
    //console.log(allPosts);
    res.send(allPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

//

router.post("/api/2", jsonParser, async (req, res) => {
  let typeNames = [
    "retail_and_recreation_percent_change_from_baseline",
    "grocery_and_pharmacy_percent_change_from_baseline",
    "parks_percent_change_from_baseline",
    "transit_stations_percent_change_from_baseline",
    "workplaces_percent_change_from_baseline",
    "residential_percent_change_from_baseline",
  ];
  let searchingType = typeNames[req.body.type];
  console.log(req.body.type);
  console.log(searchingType);

  try {
    const allPosts = await Post.find({
      country_region: req.body.chosenArea,
      date: req.body.date,
    }).select(`sub_region_1 date ${searchingType}`);
    res.send(allPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

// function getAreaData(country){

// }

module.exports = router;
