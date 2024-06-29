import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import func from "./middleware/func";
import loggerMiddleware from "./middleware/loggerMiddleware";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({ destination: "console" }),
      toast,
      func,
      loggerMiddleware,
      api,
    ],
  });
}
