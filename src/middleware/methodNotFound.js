const methodNotFound = (req, res, next) => {
  next({
    status: 405,
    message: `The method ${req.method} is not allowed on the path ${req.originalUrl}`
  });
};

module.exports = methodNotFound;
