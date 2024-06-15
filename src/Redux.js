import store from "./store/store";
import * as actions from "./store/bugs";
import { addProject } from "./store/projects";
// import store from "./customStore";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store changed!");
  });

  store.dispatch(addProject({ name: "project 1" }));

  // in the reducer we extract the description from the payload object
  store.dispatch(actions.bugAdded({ description: "bug 1" }));
  store.dispatch(actions.bugAdded({ description: "bug 2" }));
  store.dispatch(actions.bugAdded({ description: "bug 3" }));
  store.dispatch(actions.bugResolved({ id: 1 }));

  console.log("store", store);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
