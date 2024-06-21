import { assignUser } from "./store/bugs";
import configureStore from "./store/configureStore";

const Redux = () => {
  const store = configureStore();

  // store.dispatch(assignUser({ bugId: 1, userId: 1 }));

  return (
    <>
      <div>Redux</div>
    </>
  );
};
export default Redux;
