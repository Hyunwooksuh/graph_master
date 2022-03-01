const problemSet = {
  baseTemplate: `  
  /**
  * Definition for a binary tree node.
  * function TreeNode(val, left, right) {
  *  this.val = (val===undefined ? 0 : val)
  *  this.left = (left===undefined ? null : left)
  *  this.right = (right===undefined ? null : right)
  * }
  */
 
  /**
  * @param {TreeNode} root
  * @return {number[]}
  */
 `,
  preorder: {
    template: `function GRAPH_MASTER(input) {
  const output = [];
  function preorderTraversal(node) {
    // your code
  
  }
  
  preorderTraversal(input);
  return output; 
};`,
    title: "PREORDER TRAVERSAL",
    description:
      "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
    cases: [
      {
        input: {
          val: 1,
          left: null,
          right: {
            val: 2,
            left: {
              val: 3,
              left: null,
              right: null,
            },
            right: null,
          },
        },
        shortInput: "[1, null, 2, 3]",
        answer: "[1, 2, 3]",
        image: true,
      },
      {
        input: {
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
        },
        shortInput: "[1, 3, 7, 9, 5, null, 13]",
        answer: "[1, 3, 7, 9, 5, 13]",
        image: true,
      },
      {
        input: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        image: false,
      },
    ],
  },
  inorder: {
    template: `function GRAPH_MASTER(input) {
  const output = [];
  function inorderTraversal(node) {
    // your code
  
  }
  
  inorderTraversal(input);
  return output; 
};`,
    title: "INORDER TRAVERSAL",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    cases: [
      {
        input: {
          val: 1,
          left: null,
          right: {
            val: 2,
            left: {
              val: 3,
              left: null,
              right: null,
            },
            right: null,
          },
        },
        shortInput: "[1, null, 2, 3]",
        answer: "[1, 3, 2]",
        image: true,
      },
      {
        input: {
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
        },
        shortInput: "[1, 3, 7, 9, 5, null, 13]",
        answer: "[7, 3, 9, 1, 5, 13]",
        image: true,
      },
      {
        input: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        image: false,
      },
    ],
  },
  postorder: {
    template: `function GRAPH_MASTER(input) {
  const output = [];
  function postorderTraversal(node) {
    // your code
  
  }
  
  postorderTraversal(input);
  return output; 
};`,
    title: "POSTORDER TRAVERSAL",
    description:
      "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
    cases: [
      {
        input: {
          val: 1,
          left: null,
          right: {
            val: 2,
            left: {
              val: 3,
              left: null,
              right: null,
            },
            right: null,
          },
        },
        shortInput: "[1, null, 2, 3]",
        answer: "[3, 2, 1]",
        image: true,
      },
      {
        input: {
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
        },
        shortInput: "[1, 3, 7, 9, 5, null, 13]",
        answer: "[7, 9, 3, 13, 5, 1]",
        image: true,
      },
      {
        input: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        image: false,
      },
    ],
  },
  levelorder: {
    template: `function GRAPH_MASTER(input) {
  const output = [];
  function levelorderTraversal(node) {
    // your code
  
  }
  
  levelorderTraversal(input);
  return output; 
};`,
    title: "LEVEL ORDER TRAVERSAL",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    cases: [
      {
        input: {
          val: 3,
          left: {
            val: 9,
            left: null,
            right: null,
          },
          right: {
            val: 20,
            left: {
              val: 15,
              left: null,
              right: null,
            },
            right: {
              val: 7,
              left: null,
              right: null,
            },
          },
        },
        shortInput: "[3, 9, 20, null, null, 15, 7]",
        answer: "[3, 9, 20, 15, 7]",
        image: true,
      },
      {
        input: {
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
        },
        shortInput: "[1, 3, 7, 9, 5, null, 13]",
        answer: "[1, 3, 5, 7, 9, 13]",
        image: true,
      },
      {
        input: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        image: false,
      },
    ],
  },
};

export default problemSet;
