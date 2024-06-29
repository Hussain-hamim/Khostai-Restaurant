import { addBug, getUnresolvedBugs, resolvedBug } from "../bugs";
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

  it("should mark the bug resolved if it saved to the store", async () => {
    // aaa
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));

    expect(store.getState().entities.bugs.list[0].resolved).toBe(true);
  });

  it("should not mark the the bug resolved if it saved to the store", async () => {
    // aaa
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));

    expect(store.getState().entities.bugs.list[0].resolved).not.toBe(true);
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
