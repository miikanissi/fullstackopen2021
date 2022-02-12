import React from "react";
import {connect} from "react-redux";

import {createAnecdote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    props.createAnecdote(content);
    props.showNotification(`New anecdote created: ${content}`, 5);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createNewAnecdote}>
        <input name="newAnecdote" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapProps = {createAnecdote, showNotification};
export default connect(null, mapProps)(AnecdoteForm);
