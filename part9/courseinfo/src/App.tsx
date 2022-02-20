interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const Header = ({name}: {name: string}) => {
  return (
    <h1>{name}</h1>
  )
}
const Content = ({data}: {data: CoursePart[]}) => {
  return (
    <div>
      {data.map((part, index) => (
        <div key={index} >
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <Part part={part} />
        </div>
      ))}
    </div>
  )
}
const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p><i>{part.description}</i></p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <p><i>Project exercises {part.groupProjectCount}</i></p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <p><i>{part.description}</i></p>
          <p>Submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
  }
}
const Total = ({data}: {data: CoursePart[]}) => {
  const amount = data.reduce((a, b) => a + b.exerciseCount, 0)
  return (
    <p>
      Number of exercises {amount}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content data={courseParts} />
      <Total data={courseParts}/>
    </div>
  );
};

export default App;
