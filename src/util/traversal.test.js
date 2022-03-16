import traversal from "./traversal";

const obj = {
  name: 0,
  children: [
    {
      name: 1,
      children: [
        {
          name: 3,
          children: null,
        },
      ],
    },
    {
      name: 2,
      children: [
        {
          name: 4,
          children: null,
        },
      ],
    },
  ],
};

test("preorder traversal", () => {
  const traversedObj = traversal(obj, "preorder");

  expect(traversedObj.priority).toBe(0);
  expect(traversedObj.children[0].priority).toBe(1);
  expect(traversedObj.children[1].priority).toBe(3);
  expect(traversedObj.children[0].children[0].priority).toBe(2);
  expect(traversedObj.children[1].children[0].priority).toBe(4);
});

test("inorder traversal", () => {
  const traversedObj = traversal(obj, "inorder");

  expect(traversedObj.priority).toBe(2);
  expect(traversedObj.children[0].priority).toBe(1);
  expect(traversedObj.children[1].priority).toBe(4);
  expect(traversedObj.children[0].children[0].priority).toBe(0);
  expect(traversedObj.children[1].children[0].priority).toBe(3);
});

test("postorder traversal", () => {
  const traversedObj = traversal(obj, "postorder");

  expect(traversedObj.priority).toBe(4);
  expect(traversedObj.children[0].priority).toBe(1);
  expect(traversedObj.children[1].priority).toBe(3);
  expect(traversedObj.children[0].children[0].priority).toBe(0);
  expect(traversedObj.children[1].children[0].priority).toBe(2);
});

test("levelorder traversal", () => {
  const traversedObj = traversal(obj, "levelorder");

  expect(traversedObj.priority).toBe(0);
  expect(traversedObj.children[0].priority).toBe(1);
  expect(traversedObj.children[1].priority).toBe(2);
  expect(traversedObj.children[0].children[0].priority).toBe(3);
  expect(traversedObj.children[1].children[0].priority).toBe(4);
});
