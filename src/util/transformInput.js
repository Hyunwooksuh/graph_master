/* eslint-disable prefer-destructuring */
export default function transformInput(node, isDebugging) {
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

  removeEmptyChild(transformedData, 0);

  if (isDebugging) {
    setEmptyValue(transformedData);

    return transformedData;
  }

  convertNativeNullToString(transformedData);
  return transformedData;
}

function removeEmptyChild(data, index) {
  if (!data) {
    return;
  }

  if (isLeaf(data)) {
    delete data.children;
  }

  data.index = index;

  if (data.children && data.children[0]) {
    removeEmptyChild(data.children[0], 0);
  }

  if (data.children && data.children[1]) {
    removeEmptyChild(data.children[1], 1);
  }
}

function isLeaf(node) {
  const children = node.children;
  let count = 0;

  for (let i = 0; i < children.length; i++) {
    if (!children[i].name) {
      count++;

      if (count === 2) {
        return true;
      }
    }
  }

  return false;
}

function convertNativeNullToString(data) {
  if (!data) {
    return;
  }

  if (!data.name) {
    data.name = "null";
  }

  if (data.children && data.children[0]) {
    convertNativeNullToString(data.children[0]);
  }

  if (data.children && data.children[1]) {
    convertNativeNullToString(data.children[1]);
  }
}

function setEmptyValue(data) {
  if (!data) {
    return;
  }

  if (data.name) {
    data.name = null;
  } else if (!data.name) {
    data.isNull = "null";
  }

  if (data.children && data.children[0]) {
    setEmptyValue(data.children[0]);
  }

  if (data.children && data.children[1]) {
    setEmptyValue(data.children[1]);
  }
}
