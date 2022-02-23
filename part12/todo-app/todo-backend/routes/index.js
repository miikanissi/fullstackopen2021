const express = require("express");
const router = express.Router();
const redis = require("../redis");

const configs = require("../util/config");

let visits = 0;
redis.setAsync("added_todos", "0");

/* GET index data. */
router.get("/", async (_req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (_req, res) => {
  res.send({
    added_todos: await redis.getAsync("added_todos"),
  });
});

module.exports = router;
