const mongoose = require("mongoose");

const pSchema = mongoose.Schema({
    "chosenArea": String, 
    "type": Number 
});

module.exports = mongoose.model("Posts", pSchema);