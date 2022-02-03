const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    "use strict";
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    "use strict";
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use((req, res, next) => {
  "use strict";
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }
  return next();
});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.morganLogger());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
