import React, {useState} from "react";
import {Routes, Route, useNavigate, useMatch} from "react-router-dom";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification("A new anecdote " + anecdote.content + " created.");
    setTimeout(() => setNotification(null), 5000);
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={
            <>
              <Notification notification={notification} />
              <AnecdoteList anecdotes={anecdotes} />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
