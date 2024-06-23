import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // action => action handlers
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugAssignToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.description.id);
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// action creator
const url = "/bugs";

console.log(moment().dayOfYear());

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMins = moment().diff(moment(lastFetch), "minutes");
  if (diffInMins < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolvedBug = (id) =>
  apiCallBegan({
    // /bugs
    // patch /bugs/1
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignToUser.type,
  });

// selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs, // selector fn or input fn for result fn
  (state) => state.entities.projects, // selector fn or input fn
  (bugs, projects) => bugs.filter((bug) => !bug.resolved) //result fn
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
