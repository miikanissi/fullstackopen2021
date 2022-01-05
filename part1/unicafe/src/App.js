import {useState} from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div className="container">
      <div className="feedback">
        <h1>give feedback</h1>
        <div className="buttons">
          <button onClick={() => setGood(good + 1)}>good</button>
          <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
          <button onClick={() => setBad(bad + 1)}>bad</button>
        </div>
      </div>
      <div className="statistics">
        <h1>statistics</h1>
        <div className="results">
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
