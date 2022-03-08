export default function traversal(data, type) {
  let order = 0;
  switch (type) {
    case "preorder": {
      const preorderTraversal = (node) => {
        if (!node) {
          return;
        }

        node.priority = order;
        order += 1;

        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            if (node.children[i]) {
              preorderTraversal(node.children[i]);
            }
          }
        }
      };

      preorderTraversal(data);
      return data;
    }
    case "inorder": {
      const inorderTraversal = (node) => {
        if (!node) {
          return;
        }

        if (node.children && node.children[0]) {
          inorderTraversal(node.children[0]);
        }
        node.priority = order;
        order += 1;

        if (node.children && node.children[1]) {
          inorderTraversal(node.children[1]);
        }
      };

      inorderTraversal(data);
      return data;
    }
    case "postorder": {
      const postorderTraversal = (node) => {
        if (!node) {
          return;
        }

        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            if (node.children[i]) {
              postorderTraversal(node.children[i]);
            }
          }
        }

        node.priority = order;
        order += 1;
      };

      postorderTraversal(data);
      return data;
    }
    case "levelorder": {
      const levelorderTraversal = (node) => {
        if (!node) {
          return node;
        }

        const queue = [node];
        while (queue.length > 0) {
          const size = queue.length;

          for (let i = 0; i < size; i++) {
            const node = queue.shift();

            node.priority = order;
            order += 1;

            if (node.children && node.children[0]) {
              queue.push(node.children[0]);
            }
            if (node.children && node.children[1]) {
              queue.push(node.children[1]);
            }
          }
        }
      };

      levelorderTraversal(data);
      return data;
    }
    default:
      break;
  }
}
