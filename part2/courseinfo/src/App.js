function Header({name}) {
  return <h2>{name}</h2>;
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

function Total({parts}) {
  const total = parts.reduce((newTotal, part) => newTotal + part.exercises, 0);
  return <strong>Number of exercises: {total}</strong>;
}

function Course({courses}) {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content course={course} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
}

function App() {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return <Course courses={courses} />;
}

export default App;
