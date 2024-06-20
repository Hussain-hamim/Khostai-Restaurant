const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action", action);
  action.payload = 3;
  next(action);
};
export default loggerMiddleware;
