require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("post", (request, _response) => {
  "use strict";
  if (request.method === "POST") return JSON.stringify(request.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms | :post"
);

app.use(morgan("postFormat"));

const Person = require("./models/person");

app.get("/info", (_request, response, next) => {
  "use strict";
  Person.countDocuments({})
    .then((results) => {
      response.send(`
    <p>Phonebook has info for ${results} people</p>
    <p>${new Date()}</p>
    `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (_request, response, next) => {
  "use strict";
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  "use strict";
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  "use strict";
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  "use strict";
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  "use strict";
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (_request, response) => {
  "use strict";
  response.status(404).send({error: "unknown endpoint"});
};

app.use(unknownEndpoint);

const errorHandler = (error, _request, response, next) => {
  "use strict";
  console.log(error.name);
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({error: "Malformatted"});
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({error: error.message});
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  "use strict";
  console.log(`Server running on ${PORT}`);
});
