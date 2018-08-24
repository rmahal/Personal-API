const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CharacterSchema = new Schema({
   name: String,
   playstyle: String,
   bestMove: String,
   combo: String
});


const Character = mongoose.model('Character', CharacterSchema);


module.exports = Character;
