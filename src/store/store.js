import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const store = configureStore({
  reducer: reducer,
  //   devTools: devToolsEnhancer({ trace: true }),
});

export default store;
