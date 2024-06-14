import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./bugs";
import reducer from "./projects";

const store = configureStore({ reducer });
export default store;
