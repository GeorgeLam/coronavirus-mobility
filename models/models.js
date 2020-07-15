const mongoose = require("mongoose");

const pSchema = mongoose.Schema({
    "chosenArea": String, 
    "date": String,
    "type": Number,
    "country_region": String 
}, { collection: 'Global' });

module.exports = mongoose.model("Posts", pSchema);