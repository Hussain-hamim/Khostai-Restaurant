import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import { loadBugs } from "./store/bugs";

const Redux = () => {
  const store = configureStore();

  store.dispatch(loadBugs());

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
