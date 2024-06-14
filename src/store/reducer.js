import * as actions from "./actionTypes";
// []
let lastId = 0;

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */

export default function reducer(state = [], action) {
  if (action.type === actions.BUG_ADDED) {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === actions.BUG_REMOVED) {
    return state.filter((bug) => bug.id !== action.description.id);
  } else if (action.type === actions.BUG_RESOLVED) {
    return state.map(
      (bug) => (bug.id !== action.payload.id ? bug : { ...bug, resolved: true })
      /** if the id of the bug we rendering, is not equal to the bug
       * we have resolved then return as it is otherwise return
       * the a new bug object spreading the previous properties of bug
       * and add new property resolved: true  */
    );
  }

  return state;
}
