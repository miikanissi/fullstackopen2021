const morgan = require("morgan");
const logger = require("./logger");

morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});
const morganLogger = () => {
  if (process.env.NODE_ENV === "test") {
    return (_req, _res, next) => next();
  }
  return morgan(":method :url :status :res[content-length] - :response-time ms :data");
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({error: "unknown endpoint"});
};
const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({error: "malformatted id"});
  } else if (error.name === "ValidationError") {
    return response.status(400).json({error: error.message});
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganLogger,
};
