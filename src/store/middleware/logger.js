// SNA
const logger = (param) => (store) => (next) => (action) => {
  console.log("logging", param);
  next(action);
};

export default logger;
