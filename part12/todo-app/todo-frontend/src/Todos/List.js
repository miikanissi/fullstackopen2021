import React from "react";

const TodoList = ({todos, deleteTodo, completeTodo}) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos
        .map((todo) => {
          const doneInfo = (
            <div>
              <span>This todo is done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
              </span>
            </div>
          );

          const notDoneInfo = (
            <div>
              <span>This todo is not done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
                <button onClick={onClickComplete(todo)}> Set as done </button>
              </span>
            </div>
          );

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "70%",
                margin: "auto",
              }}
              key={todo}
            >
              <span>{todo.text}</span>
              {todo.done ? doneInfo : notDoneInfo}
            </div>
          );
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  );
};

export default TodoList;
