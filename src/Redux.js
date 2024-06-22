import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import {
  addBug,
  assignBugToUser,
  bugAdded,
  loadBugs,
  resolvedBug,
} from "./store/bugs";

const Redux = () => {
  const store = configureStore();

  store.dispatch(loadBugs());

  store.dispatch(addBug({ description: "a new bug" }));

  setTimeout(() => {
    store.dispatch(loadBugs());
    // store.dispatch(resolvedBug(1));
    store.dispatch(assignBugToUser(1, 4));
  }, 200);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
