import configureStore from "./store/configureStore";

const Redux = () => {
  const store = configureStore();

  store.dispatch((dispatch, getState) => {
    // api

    dispatch({ type: "error", payload: { message: "an error occurred" } });
  });

  store.dispatch({ type: "one", payload: "hello" });
  store.dispatch({ type: "one", payload: "hello" });

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
