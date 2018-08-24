// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let me = [{
  name: "Raj Mahal",
  githubUsername: "rmahal",
  githubProfileImage: "https://avatars1.githubusercontent.com/u/15217218?s=400&v=4",
  personalSiteLink: "https://rmahal.github.io/rmahal.io/",
  currentCity: "San Francisco",
  hobbies:  [{
    coding: "Web Development",
    languages: "HTML/CSS/JavaScript",
    personalFavoriteProject: "https://rmahal.github.io/rmahal.io/"
  },{
    gaming: "All Platforms",
    favoriteGame: "Tekken",
    tournamentsEntered: "5"
  },{
    music: "Playing Guitar",
    genre: "Metal",
    favoriteBand: "Megadeth"
  }]
}];

/************
 * DATABASE *
 ************/

 const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    //woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://agile-ravine-92696.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/TekkenCharacterBreakdown", description: "Compiled information for every character in Tekken 7"} ,// CHANGE ME
      {method: "POST", path: "/api/TekkenCharacterBreakdown", description: "Compiled information for every character in Tekken 7"}
    ]
  })
});

app.get('/api/profile', (req,res) =>{
  res.send(me); 
});



// Index
app.get('/api/characters', (req, res) => {
  db.Character.find( {}, (err, allCharacters) => {
    if(err){ return res.status(400).json({err: "error has occured"})}
    console.log("Found Characters: ", allCharacters.length);
    res.json({data: allCharacters});
  })
});

// Search
app.get('/api/characters/search', (req, res) => {
  let searchQuery = req.query.q;
  db.Character.find( {name: searchQuery}, (err, results) => {
    if(err){ return res.status(400).json({err: "error has occured"})}
    console.log("Found Characters: ", results.length);
    res.json({data: results});
  })
});


app.post('/api/characters', (req, res) =>{

  let newCharacter =    {
    name: req.body.name,
    playstyle: req.body.playstyle,
    bestMove: req.body.bestMove,
    combo: req.body.combos
  }

  db.Character.create(newCharacter, (err, madeChar)=>{
    if(err){console.log(err);}
      res.json(madeChar);
  });
});



app.get('/api/characters/:id', (req,res) =>{
  db.Character.findOne({_id: req.params.id}, (err, foundChar)=>{
    if(err){console.log(err);}
    res.json(foundChar);
  });
});


app.put('/api/characters/:id', (req,res) =>{
  
  let charId = req.params.id;
  let updatedInfo = req.body;


  console.log("before find one: "+updatedInfo);

  db.Character.findOneAndUpdate({_id: charId}, updatedInfo, {new: true}, (err, updatedChar) => {
    console.log("after find one: "+updatedChar);
    if(err){console.log(err);}
    res.json(updatedChar);
  });  
});




app.delete('/api/characters/:id', (req, res)=>{
  let charId = req.params.id;
  db.Character.deleteOne( {_id: charId}, (err, deletedChar)=>{
    if(err){console.log(err);}

      res.json(deletedChar);
  });
});


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
