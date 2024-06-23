// solitary test

import { addBug } from "../bugs";
import configureStore from "../configureStore";

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
    const store = configureStore();
    const bug = { description: "a" };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
