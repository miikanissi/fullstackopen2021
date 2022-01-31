const mongoose = require("mongoose");
require("dotenv").config();

const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose
  .connect(url, {})
  .then(() => {
    "use strict";
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    "use strict";
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minLength: 3},
  number: {type: String, required: true, minLength: 8},
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    "use strict";
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
