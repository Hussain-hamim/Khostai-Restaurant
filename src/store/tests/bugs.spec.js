// solitary test

import { addBug } from "../bugs";
import configureStore from "../configureStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// import { apiCallBegan } from "../api";
// import { addBug, bugAdded } from "../bugs";

// describe("bugSlice", () => {
//   describe("action creator", () => {
//     it("addBug", () => {
//       const bug = { description: "a" };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: "/bugs",
//           method: "post",
//           data: bug,
//           onSuccess: bugAdded.type,
//         },
//       };
//       expect(result).toEqual(expected);
//     });
//   });
// });

// social test
describe("bugSlice", () => {
  it("should handle the addBug action", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };

    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
