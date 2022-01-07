import {useState} from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const randomizeAnecdote = () => setSelected(getRandomInt(anecdotes.length));
  const voteAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };
  const mostVotes = () => {
    let max = Math.max(...votes);
    return votes.indexOf(max);
  };
  return (
    <div className="container">
      <h1>Anecdote of the day</h1>
      <div className="anecdote">
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      </div>
      <div className="buttons">
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={randomizeAnecdote}>next anecdote</button>
      </div>
      {votes[mostVotes()] === 0 ? (
        <div className="most-votes">
          <h1>Anecdote with most votes</h1>
          <div className="anecdote">
            <p>No anecdote has votes today. Be first to vote.</p>
          </div>
        </div>
      ) : (
        <div className="most-votes">
          <h1>Anecdote with most votes</h1>
          <div className="anecdote">
            <p>{anecdotes[mostVotes()]}</p>
            <p>has {votes[mostVotes()]} votes</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
