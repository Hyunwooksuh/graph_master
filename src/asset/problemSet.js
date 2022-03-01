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
    input: {},
    answer: {},
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
    input: {},
    answer: {},
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
    input: {},
    answer: {},
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
    input: {},
    answer: {},
  },
};

export default problemSet;
