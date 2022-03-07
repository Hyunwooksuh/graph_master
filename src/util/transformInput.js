/* eslint-disable prefer-destructuring */
export default function transformInput(node) {
  const transformedData = {};
  const nodeStack = [];
  const dataStack = [];

  let temp = transformedData;

  while (nodeStack.length || node !== null) {
    if (node !== null) {
      temp.name = node.val;
      temp.children = [
        { name: null, children: [] },
        { name: null, children: [] },
      ];

      nodeStack.push(node);
      dataStack.push(temp);
      temp = temp.children[0];
      node = node.left;
    } else {
      temp = dataStack.pop().children[1];
      node = nodeStack.pop().right;
    }
  }

  return transformedData;
}
