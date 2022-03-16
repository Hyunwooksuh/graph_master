import transformInput from "./transformInput";

const nativeInput = {
  val: 1,
  left: {
    val: 3,
    left: {
      val: 7,
      left: null,
      right: null,
    },
    right: {
      val: 9,
      left: null,
      right: null,
    },
  },
  right: {
    val: 5,
    left: null,
    right: {
      val: 13,
      left: null,
      right: null,
    },
  },
};

const errorInput = {
  val: 1,
  front: {
    val: 2,
    front: null,
  },
};

describe("transform native input to d3 tree specified input", () => {
  const result = transformInput(nativeInput);

  test("has children properties", () => {
    const isChildrenExist = Object.prototype.hasOwnProperty.call(result, "children");

    expect(isChildrenExist).toBe(true);
  });
});
