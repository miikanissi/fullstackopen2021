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

export default Course;
