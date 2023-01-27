const express = require('express');
const cuid = require('cuid');
const decksController = require('./decks.controller.js');
const router = express.Router();
const methodNotFound = require('../middleware/methodNotFound.js');
const cardsRouter = require('../cards/cards.router.js');

router.route('/')
  .get(decksController.getAll)
  .post(decksController.create)
  .all(methodNotFound);

router.route('/:deckId')
  .get(decksController.get)
  .put(decksController.update)
  .delete(decksController.destroy)
  .all(methodNotFound);

// full path that this represents is /decks/:deckId/cards
router.use('/:deckId/cards', decksController.validateDeckExists, cardsRouter);

module.exports = router;
