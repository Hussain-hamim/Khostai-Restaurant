import configureStore from "./store/configureStore";
import * as actions from "./store/api";

const Redux = () => {
  const store = configureStore();

  store.dispatch(
    actions.apiCallBegan({
      url: "/bugs",
      onSuccess: "bugsReceived",
      // onError: actions.apiCallFailed.type,
    })
  );

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
