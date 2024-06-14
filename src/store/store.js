import { configureStore } from "@reduxjs/toolkit";
import reducer from "./bugs";

const store = configureStore({ reducer });
export default store;
