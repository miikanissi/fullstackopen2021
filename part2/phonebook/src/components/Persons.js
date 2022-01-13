import React from "react";
import personService from "../services/person";

function Persons({filterPerson, setPersons, setMessage}) {
  const isDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personService
        .deletePerson(person.id)
        .then((_response) => {
          setPersons(filterPerson.filter((item) => item !== person));
          setMessage({
            text: `${person.name} has been removed`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((_err) => {
          setMessage({
            text: `${person.name} was already removed from the server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
      setPersons(filterPerson.filter((item) => item !== person));
    }
  };

  return filterPerson.map((e) => (
    <p key={e.id}>
      {e.name} {e.number} <button onClick={() => isDelete(e)}>delete</button>
    </p>
  ));
}

export default Persons;
