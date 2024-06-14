import reducer from "./reducer";

function createStore(reducer) {
  let state; // private property
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    // when dispatch an action here we gonna notify the subscriber or listener
    for (let i = 0; i < listeners.length; i++) listeners[i](); // get the listener and call it
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}
export default createStore(reducer);
