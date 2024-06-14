import { createAction } from "@reduxjs/toolkit";

// action creators
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// reducer
let lastId = 0;
export default function reducer(state = [], action) {
  if (action.type === bugAdded.type) {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === bugRemoved.type) {
    return state.filter((bug) => bug.id !== action.description.id);
  } else if (action.type === bugResolved.type) {
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