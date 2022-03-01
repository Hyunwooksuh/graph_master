import { Controlled as CodeMirror } from "react-codemirror2";
import { JSHINT } from "jshint";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "./Editor.css";

import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import { useState } from "react";

window.JSHINT = JSHINT;

export default function Editor() {
  const template = `  
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
  function GRAPH_MASTER(input) {
    const output = [];
    function preorderTraversal(node) {
      // your code

    }

    preorderTraversal(input);
    return output; 
  };
  `;

  const options = {
    mode: "javascript",
    theme: "shadowfox",
    lineNumbers: true,
    lineWrapping: true,
    lint: true,
    tabSize: 2,
    lintOnChange: false,
    autoCloseBrackets: true,
  };

  // 임시로 설정 -> 리덕스로 다시 셋팅예정
  const [value, setValue] = useState(null);

  return (
    <div>
      <CodeMirror
        className="CodeMirror"
        value={value}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
      />
    </div>
  );
}
