function Header({name}) {
  return <h1>{name}</h1>;
}

function Part(props) {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
}

function Content({course}) {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
}

function Total({course}) {
  let total =
    course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  return <p>Number of exercises {total}</p>;
}

function Course({course}) {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  );
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return <Course course={course} />;
}

export default App;
