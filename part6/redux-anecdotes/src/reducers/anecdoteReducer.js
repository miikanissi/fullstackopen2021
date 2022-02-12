import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      return state.map((anecdote) =>
        anecdote.id === action.data
          ? {...anecdote, votes: anecdote.votes + 1}
          : anecdote
      );
    }
    case "NEW":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote({...anecdote, votes: anecdote.votes + 1});
    dispatch({
      type: "VOTE",
      data: anecdote.id,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
