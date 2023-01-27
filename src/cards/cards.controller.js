const controller = {};
// Import data store
const { cards, decks } = require("../dataStore.js");
const cuid = require('cuid');

const logger = require('../logger.js');

controller.getAll = (req, res, next) => {
  const { deck } = res.locals;
  let data = cards;
  if (deck) {
    // filter the cards before we send them back
    data = data.filter(card => card.deckId === deck.id)
  }
  res
    .json({ data });
};

controller.get = (req, res, next) => {
  const { cardId } = req.params;
  const card = cards.find(c => c.id === cardId);

  // make sure we found a card
  if (!card) {
    const message = `Card with id ${cardId} not found.`;
    return next({ status: 404, message });
  }

  res.json({ data: card });
};

controller.create = (req, res, next) => {
  const { data } = req.body;
  if (!data) {
    const message = `Body must have 'data' key`;
    return next({ status: 400, message });
  }

  const { front, back, deckId } = data;

  // Validate required fields are present
  const requiredFields = ["front", "back", "deckId"];
  for (const field of requiredFields) {
    if (!data[field]) {
      const message = `'${field}' is required`;
      return next({ status: 400, message });
    }
  }

  // Validate deck exists
  const deck = decks.find(d => d.id === deckId);
  if (!deck) {
    const message = `Deck id ${deckId} does not exist.`;
    return next({ status: 400, message });
  }

  // Create an ID
  const id = cuid();

  const card = {
    id,
    front,
    back,
    deckId,
  };

  cards.push(card);
  logger.info(`Card with id ${id} created`);

  res
    .status(201)
    .json({ data: card });
};

controller.destroy = (req, res, next) => {
  const { cardId } = req.params;
  const cardIndex = cards.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    const message = `Card id ${cardId} does not exist`;
    return next({ status: 404, message });
  }

  cards.splice(cardIndex, 1);
  res
    .status(204)
    .send();
};

module.exports = controller;
