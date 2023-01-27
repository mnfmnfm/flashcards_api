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
  .delete(decksController.destroy)
  .all(methodNotFound);

// 
router.use('/:deckId/cards', decksController.validateDeckExists, cardsRouter);

module.exports = router;
