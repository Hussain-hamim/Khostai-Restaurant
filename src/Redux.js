import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import { addBug, bugAdded, loadBugs } from "./store/bugs";

const Redux = () => {
  const store = configureStore();

  store.dispatch(loadBugs());

  store.dispatch(addBug({ description: "a new bug" }));

  // setTimeout(() => {
  //   store.dispatch(loadBugs());
  // }, 200);

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
