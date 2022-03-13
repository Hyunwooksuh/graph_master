import pathFind from "../constant/pathFind";

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
  // Tree traversal problem set
  preorder: {
    template: `function GRAPH_MASTER(input) {
  const output = [];
  function preorderTraversal(node) {
    // your code
  
  }
  
  preorderTraversal(input);
  return output; 
};`,
    kind: "tree",
    title: "PREORDER TRAVERSAL",
    description:
      "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
    cases: [
      {
        input: `{
          val: 1,
          left: null,
          right: null,
        }`,
        nativeInput: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        nativeArrayAnswer: [1],
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [1, 3, 7, 9, 5, 13],
        image: true,
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [1, 2, 3],
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
    kind: "tree",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    cases: [
      {
        input: `{
          val: 1,
          left: null,
          right: null,
        }`,
        nativeInput: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        nativeArrayAnswer: [1],
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [1, 3, 2],
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [7, 3, 9, 1, 5, 13],
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
    kind: "tree",
    description:
      "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
    cases: [
      {
        input: `{
          val: 1,
          left: null,
          right: null,
        }`,
        nativeInput: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [3, 2, 1],
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [7, 9, 3, 13, 5, 1],
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
    kind: "tree",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    cases: [
      {
        input: `{
          val: 1,
          left: null,
          right: null,
        }`,
        nativeInput: {
          val: 1,
          left: null,
          right: null,
        },
        shortInput: "[1]",
        answer: "[1]",
        nativeArrayAnswer: [1],
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [1, 3, 5, 7, 9, 13],
        image: true,
      },
      {
        input: `{
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
        }`,
        nativeInput: {
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
        nativeArrayAnswer: [3, 9, 20, 15, 7],
      },
    ],
  },
  // Path finder problem set
  shortestPath: {
    baseTemplate: `/** Definition for each on the grid
* class Spot {
*  constructor(row, column) {
*   this.x = row;
*   this.y = column;
*   this.isStart = (x === start_row & this.y === start_col)
*   this.isEnd = (x === end_row & this.y === end_col)
*   this.g = 0;
*   this.f = 0;
*   this.h = 0;
*   this.neighbors = []; // adjacent nodes
*   this.wall = (Boolean)
*   this.previous = null;
*  }
* }
*/
`,
    template: `function GRAPH_MASTER(startSpot, endSpot) {
  // push the elements of shortest path
  const output = [];
  const visitedNodes = [];
  function pathFinder(startSpot, endSpot) {
    // your code
  
  }
  
  pathFinder(startSpot, endSpot);
  return { output: output, visitedNodes: visitedNodes }; 
};

// heuristic function to evaluate 'h'
function heuristic (a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}`,
    utils: {
      createWall: `function createWall(grid, input) {
        for (let k = 0; k < input.length; k++) {
          const x = input[k].x;
          const y = input[k].y;
    
          grid[x][y].isWall = true;
        }
      }`,
      createSpot: `function createSpot(grid) {
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLUMNS; j++) {
            grid[i][j] = new Spot(i, j);
          }
        }
      }`,
      updateNeighbors: `function updateNeighbors(grid) {
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLUMNS; j++) {
            grid[i][j].addNeighbors(grid, ROWS, COLUMNS);
          }
        }
      }`,
    },
    kind: "path",
    title: "A Star algorithm",
    description: "Implement A* algorithm to find the shortest path from green node to red node",
    wall: [
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 3, y: 2 },
      { x: 0, y: 4 },
      { x: 0, y: 3 },
      { x: 2, y: 4 },
    ],
    stringWall: `[
      { x: 1, y: 2},
      { x: 2, y: 0},
      { x: 3, y: 2},
      { x: 0, y: 4},
      { x: 0, y: 3},
      { x: 2, y: 4},
    ]`,
    stringOutput: `[
      { x: 3, y: 4 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ]`,
    output: [
      { x: 3, y: 4 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
  },
};

export default problemSet;
