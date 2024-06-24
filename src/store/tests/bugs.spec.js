import { addBug, getUnresolvedBugs } from "../bugs";
import configureStore from "../configureStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// social test
describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  it("should handle the addBug action", async () => {
    // arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // act
    await store.dispatch(addBug(bug));

    // assert
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });

  // test for fail state
  it("should handle the addBug action", async () => {
    // arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    // act
    await store.dispatch(addBug(bug));

    // assert
    expect(store.getState().entities.bugs.list).toHaveLength(0);
  });

  describe("getUnresolvedBugs", () => {
    it("getUnresolvedBugs", () => {
      getUnresolvedBugs({
        entities: {
          bugs: {
            list: [{ id: 1, resolved: true }, { id: 1 }, { id: 1 }],
          },
        },
      });
    });
  });
});
