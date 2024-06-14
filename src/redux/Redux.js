import React from "react";
import * as actions from "./actions";
// import store from "./customStore";
import store from "./store";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store change");
  });

  store.dispatch(actions.bugAdded("bug 1"));

  console.log("hello");

  return <div>Redux</div>;
};
export default Redux;
