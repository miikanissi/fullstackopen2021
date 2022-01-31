const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("Please provide all the arguments: node mongo.js password name number");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.fg5v2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

console.log(person);

person.save().then((result) => {
  console.log(result);
  console.log("Person saved!");
  mongoose.connection.close();
});
