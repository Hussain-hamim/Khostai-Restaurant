import store from "./store/store";
import * as actions from "./store/bugs";
// import store from "./customStore";

const Redux = () => {
  store.subscribe(() => {
    console.log("Store change");
  });
  // in the reducer we extract the description from the payload object
  store.dispatch(actions.bugAdded({ description: "bug 1" }));
  store.dispatch(actions.bugAdded({ description: "bug 2" }));
  store.dispatch(actions.bugAdded({ description: "bug 3" }));
  store.dispatch(actions.bugResolved({ id: 1 }));

  return <div>Redux</div>;
};
export default Redux;
