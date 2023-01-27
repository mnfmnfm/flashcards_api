const { cards, decks } = require('../dataStore.js');
const { logger } = require('../logger.js');

function deleteItem(collection, id) {
  const itemIndex = collection.findIndex(i => i.id === id);
  if (itemIndex > -1) {
    collection.splice(itemIndex, 1);
  }
}

const getAll = (req, res, _next) => {
  res
    .json({ data: decks });
};


const validateDeckExists = (req, res, next) => {
  const { deckId } = req.params;
  const deck = decks.find(d => d.id === deckId);

  // make sure we found a deck
  if (!deck) {
    const message = `Deck with id ${deckId} not found.`;
    return next({ status: 404, message });
  } else {
    // saving our deck object into the response so that we can access it in future middleware/route handlers
    res.locals.deck = deck;
    return next();
  }
}

const get = (req, res, next) => {
  const { deckId } = req.params;
  // pull out the deck object that was saved, above, in the validateDeckExists middleware
  const { deck } = res.locals;

  const cardsInDeck = cards.filter(card => card.deckId === deckId);
  // the below line of code is bad because it modifies our actual deck data
  // deck.cards = cardsInDeck;

  // send back the data with the cards in the deck
  res.json({
    data: {
      cards: cardsInDeck,
      ...deck
    }
  });
};

const create = (req, res, next) => {
  const { data } = req.body;
  if (!data) {
    const message = `Body must have 'data' key`;
    return next({ status: 400, message });
  }

  const { name, description } = data;

  const requiredFields = ["name", "description"];
  for (const field of requiredFields) {
    if (!data[field]) {
      const message = `'${field}' is required`;
      return next({ status: 400, message });
    }
  }

  // get an id
  const id = cuid();

  const deck = {
    id,
    name,
    description,
  };

  decks.push(deck);

  logger.info(`Deck with id ${id} created`);

  res
    .status(201)
    .json({ data: deck });
};

const update = (req, res, next) => {
  const { deck } = res.locals; // this was set for us by validateDeckExists
  // update the fields in that deck
  // the request includes the data to update in the body
  const { name, description } = req.body.data;
  // use or to make sure that we only get actual updates, no empty updates
  deck.name = name || deck.name;
  deck.description = description || deck.description;
  // save (this is kinda done for us because we're using an array rather than a database)
  // send the updated data back in the response
  res.json({ data: deck });
}

const destroy = (req, res, next) => {
  const { deckId } = req.params;

  const deckIndex = decks.findIndex(d => d.id === deckId);
  // Delete deck
  deleteItem(decks, deckId);
  // Delete all cards in deck
  cards
    .filter(c => c.deckId === deckId)
    .forEach(c => deleteItem(cards, c.id));

  logger.info(`Deck with id ${deckId} deleted.`);
  res
    .status(204)
    .end();
};

const controller = {
  getAll,
  get: [validateDeckExists, get],
  create,
  update: [validateDeckExists, update],
  destroy: [validateDeckExists, destroy],
  validateDeckExists
}
module.exports = controller;
