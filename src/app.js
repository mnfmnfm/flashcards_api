const express = require("express");
const morgan = require("morgan");
const cuid = require("cuid");

const app = express();

const { logger } = require('./logger.js');

// Import data store
const { cards, decks } = require("./dataStore");
// Import routers
const cardsRouter = require('./cards/cards.router.js');
const decksRouter = require('./decks/decks.router.js');

// Utility function to delete items from any provided collection by id

// -- PIPELINE STARTS HERE ---

// Middleware
app.use(morgan("common"));
app.use(express.json());

app.use('/cards', cardsRouter);
app.use('/decks', decksRouter);

const puppies = [];

// app.use and app.get both tell Express to listen 
// on a particular route.
// app.use will run for ALL HTTP methods (get, post, put, delete, patch, etc)
// app.use will run for non-exact path matches (subpaths)
app.get('/puppies', (req, res, next) => {
  res.json({ data: thisisnotarealvariable });
})

let nextId = 1;
app.post('/puppies', (req, res, next) => {
  // actually save puppy data that was sent in the request
  // data in post requests shows up in the body
  // breed, color, activities
  let newPuppy = {
    breed: req.body.data.breed,
    color: req.body.data.color,
    activities: req.body.data.activities,
    id: nextId
  };
  // if the request doesn't include all of these things:
  // - could set a default value
  // - could error: tell the user to include all of the things
  nextId++;
  puppies.push(newPuppy);
  // send a reasonable response
  res.status(201).json({ data: newPuppy });
});

// 404 handler
app.use((req, res, next) => {
  next(
    {
      status: 404,
      message: `The path ${req.url} was not found.`
    }
  )
});

// Error Handler
app.use(function errorHandler(error, req, res, _next) {
  console.error(error);
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  logger.error(message);

  res
    .status(status)
    .json({ error: message });
});

module.exports = app;