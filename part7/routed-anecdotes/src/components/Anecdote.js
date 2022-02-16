import React from "react";

const Anecdote = ({anecdote}) => {
  console.log(anecdote);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>
        <p>Author: {anecdote.author}</p>
        <p>Has {anecdote.votes} votes</p>
        <p>
          For more info see: <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </div>
    </div>
  );
};

export default Anecdote;
