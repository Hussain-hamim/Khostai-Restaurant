import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // action => action handlers
    assignUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.filter((bug) => bug.id !== action.description.id);
    },
  },
});

export const { bugAdded, bugResolved, bugRemoved, assignUser } = slice.actions;
export default slice.reducer;

// selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getResolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// // action creators
// export const bugAdded = createAction("bugAdded"); // we get action object
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // // reducer
// let lastId = 0;
// export default createReducer([], {
//   // key: value
//   // action: function (event => event handler)
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },

//   [bugRemoved.type]: (bugs, action) => {
//     bugs.filter((bug) => bug.id !== action.description.id);
//   },
// });

// // // reducer
// let lastId = 0;
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.description.id);

//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );

//     default:
//       return state;
//   }
// }

/** if the id of the bug we rendering, is not equal to the bug
 * we have in our array then return as it is otherwise return
 * the a new bug object spreading the previous properties of bug
 * and add new property resolved: true  */
