import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import { addBug, bugAdded, loadBugs, resolvedBug } from "./store/bugs";

const Redux = () => {
  const store = configureStore();

  store.dispatch(loadBugs());

  store.dispatch(addBug({ description: "a new bug" }));

  setTimeout(() => {
    // store.dispatch(loadBugs());
    store.dispatch(resolvedBug(1));
  }, 200);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
