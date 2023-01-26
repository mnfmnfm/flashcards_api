const express = require('express');
const cuid = require('cuid');
const decksController = require('./decks.controller.js');
const router = express.Router();

router.route('/')
  .get(decksController.getAll)
  .post(decksController.create);

router.route('/:deckId')
  .get(decksController.get)
  .delete(decksController.destroy);

module.exports = router;
