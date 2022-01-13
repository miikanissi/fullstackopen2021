import "./index.css";
import React, {useState, useEffect} from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Handle filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilterPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  // Handle adding person to database
  const addPerson = (e) => {
    e.preventDefault();
    const personsArray = persons.map((e) => e.name);
    const personObject = {
      name: name,
      number: number,
    };
    if (personsArray.includes(`${personObject.name}`)) {
      const oldPerson = persons.filter((e) => e.name === name);
      const _id = oldPerson.map((e) => e.id)[0];
      const result = window.confirm(
        `${name} is already added to phonebook. Would you like to replace the old number with the new one?`
      );
      if (result) {
        personService.updatePerson(_id, personObject).then((returnedPerson) => {
          const newPersons = persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          );
          setPersons(newPersons);
        });
        setMessage({text: `Edited ${personObject.name}`, type: "success"});
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        setName("");
        setNumber("");
      }
    } else {
      personService
        .createPerson(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
      setMessage({text: `Added ${personObject.name}`, type: "success"});
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setName("");
      setNumber("");
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);
  const addPersonData = {
    name,
    number,
    handleNameChange,
    handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      {filter === "" ? (
        <Persons
          filterPerson={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ) : (
        <Persons
          filterPerson={filterPersons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default App;
