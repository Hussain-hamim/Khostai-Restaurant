import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import logger from "./middleware/logger";

const store = configureStore({ reducer, middleware: [logger] });
export default store;
