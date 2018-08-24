// requiring models executes index.js, which in turn gives us Todo and Person

const db = require('./models');


let characters = [{
        name: "Marshall Law",
        playstyle: "Agressive",
        bestMove: "d/f+2",
        combo: "d/f+2, 4,3, dss f+4",
  },
  {
        name: "Forest Law",
        playstyle: "Agressive",
        bestMove: "4,3,2",
        combo: "4,3,2 4,3,4"
  },
  {
        name: "Paul Phoenix",
        playstyle: "Agressive",
        bestMove: "qcf+2",
        combo: "qcf+2"
  }]



// Remove all objects from database
db.Character.deleteMany( {}, (err, everythingRemoved) => {
  if(err) { return console.log(err) }
  console.log("all gone: ", everythingRemoved);
  // when we know we have no more objects, then create new objects
    createChar();
});





let createChar = function(){
    db.Character.create(characters, (err, allCharacters) => {
    if(err) { return console.log(err) }
    retrieveChar();    
})
}

let retrieveChar = function( ){
    db.Character.find( {} ,(err, allCharacters) => {
        if(err) { return console.log(err) }
        console.log("TOTAL Characters: ", allCharacters.length)
        console.log("all chars: ", allCharacters);
        process.exit();
    });
}


  
// Remove all objects from database
// db.Person.deleteMany( {}, (err, everythingRemoved) => {
//   if(err) { return console.log(err) }
//   console.log("all gone: ", everythingRemoved);
//   // when we know we have no more objects, then create new objects
//   db.Person.create( people, (err, newPerson) => {
//     if(err) { return console.log(err) }
//     console.log("saved new person: ", newPerson);
//   });

// });