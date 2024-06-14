import React from "react";
import * as actions from "./store/actions";
import store from "./store/store";
// import store from "./customStore";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store change");
  });

  store.dispatch(actions.bugAdded("bug 1"));
  store.dispatch(actions.bugAdded("bug 2"));
  store.dispatch(actions.bugAdded("bug 3"));
  store.dispatch(actions.bugResolved(1));

  return <div>Redux</div>;
};
export default Redux;
