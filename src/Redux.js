import store from "./store/store";
import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  assignUser,
  getBugsByUser,
  getResolvedBugs,
} from "./store/bugs";
import { addProject } from "./store/projects";
import { addUser } from "./store/users";
import { useEffect, useState } from "react";
// import store from "./customStore";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store changed!...");
  });

  // store.dispatch(addProject({ name: "project 1" }));
  store.dispatch(addUser({ name: "hussain" }));
  // store.dispatch(addUser({ name: "hamim" }));

  // // in the reducer we extract the description from the payload object
  // store.dispatch(bugAdded({ description: "bug 1" }));
  // store.dispatch(bugAdded({ description: "bug 2" }));
  // store.dispatch(bugAdded({ description: "bug 3" }));

  // store.dispatch(assignUser({ bugId: 1, userId: 1 })); // normalize state

  // store.dispatch(bugResolved({ id: 1 }));

  // const bugs = getUnresolvedBugs(store.getState());
  // console.log("unresolved bugs: ", bugs);

  // const bugsRes = getResolvedBugs(store.getState());
  // console.log("resolved bugs: ", bugsRes);

  // const bug = getBugsByUser(1)(store.getState());
  // console.log("userId 1 bug: ", bug);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
