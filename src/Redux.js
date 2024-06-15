import store from "./store/store";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";
import { addProject } from "./store/projects";
// import store from "./customStore";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store changed!");
  });

  store.dispatch(addProject({ name: "project 1" }));

  // in the reducer we extract the description from the payload object
  store.dispatch(bugAdded({ description: "bug 1" }));
  store.dispatch(bugAdded({ description: "bug 2" }));
  store.dispatch(bugAdded({ description: "bug 3" }));
  store.dispatch(bugResolved({ id: 1 }));

  const bugs = getUnresolvedBugs(store.getState());
  console.log("bugs", bugs);
  // console.log("store", store);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
