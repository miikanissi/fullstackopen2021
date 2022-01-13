import React from "react";
import personService from "../services/person";

function Persons({filterPerson, setPersons}) {
  const isDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personService.deletePerson(person.id);
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
