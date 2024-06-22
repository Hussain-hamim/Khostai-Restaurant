import { isEven } from "./math";

describe("isEven", () => {
  it("return true if given even number", () => {
    // fn under test
    const result = isEven(2);
    expect(result).toEqual(true);
  });

  it("return false if given odd number", () => {
    // fn under test
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
