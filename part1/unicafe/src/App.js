import {useState} from "react";

function StatisticLine(props) {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

function Statistics(props) {
  let statistics;
  let all = props.good + props.neutral + props.bad;
  let avg = (props.good - props.bad) / all;
  let pos = (props.good / all) * 100;
  if (all > 0) {
    statistics = (
      <div className="results">
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={pos + " %"} />
          </tbody>
        </table>
      </div>
    );
  } else {
    statistics = (
      <div className="results">
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div className="statistics">
      <h1>statistics</h1>
      {statistics}
    </div>
  );
}

function Button(props) {
  const increaseButton = () => props.setter(props.counter + 1);
  return <button onClick={increaseButton}>{props.text}</button>;
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div className="container">
      <div className="feedback">
        <h1>give feedback</h1>
        <div className="buttons">
          <Button counter={good} setter={setGood} text="good" />
          <Button counter={neutral} setter={setNeutral} text="neutral" />
          <Button counter={bad} setter={setBad} text="bad" />
        </div>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
