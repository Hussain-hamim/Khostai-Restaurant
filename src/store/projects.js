import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    //action => action handlers
    addProject: (projects, action) => {
      projects.push({ id: ++lastId, name: action.payload.name });
    },
  },
});

export const { addProject } = slice.actions;
export default slice.reducer;
