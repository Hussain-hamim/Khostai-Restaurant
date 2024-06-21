import { assignUser } from "./store/bugs";
import configureStore from "./store/configureStore";

const Redux = () => {
  const store = configureStore();

  store.dispatch({
    type: "apiCallBegan",
    payload: {
      url: "/bugs",
      onSuccess: "bugsReceived",
      onError: "apiRequestFailed",
    },
  });

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
