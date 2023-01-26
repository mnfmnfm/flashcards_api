const express = require('express');
const cardsController = require('./cards.controller.js');

const router = express.Router();

// add routes to the router

router.route('/')
  .get(cardsController.getAll)
  .post(cardsController.create);

router.route('/:cardId')
  .get(cardsController.get)
  .delete(cardsController.destroy);

module.exports = router;
