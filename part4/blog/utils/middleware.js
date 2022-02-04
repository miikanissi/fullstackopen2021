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
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({error: "invalid token"});
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({error: "token expired"});
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");

  authorization && authorization.toLowerCase().startsWith("bearer ")
    ? (request.token = authorization.substring(7))
    : (request.token = null);

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganLogger,
  tokenExtractor,
};
