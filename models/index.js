const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});

// module.exports.Campsite = require("./campsite.js.example");


const Characters = require('./character');

module.exports = {
    Character: Characters
}