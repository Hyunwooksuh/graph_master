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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import problemSet from "../../asset/problemSet";

window.JSHINT = JSHINT;

const Wrapper = styled.div`
  .submit-button-container {
    display: flex;
    justify-content: center;
    margin: 10px;
  }

  .submit-button {
    display: flex;
    justify-content: center;
    width: 50%;
    border-radius: 15px;
    background: steelblue;
    font-size: 18px;
    font-weight: bolder;
  }
`;

export default function Editor() {
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

  const { currentProblem } = useSelector((state) => state.problem);
  const { isDebugging } = useSelector((state) => state.debug);
  const problem = problemSet[currentProblem];
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (problem) {
      setValue(problem.template);
    }
  }, [problem]);

  const handleClickSubmit = () => {};

  return (
    <Wrapper>
      <CodeMirror
        className="CodeMirror"
        value={value}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
      />
      {!isDebugging && currentProblem && (
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleClickSubmit}>
            ⏩ SUBMIT CODE
          </button>
        </div>
      )}
    </Wrapper>
  );
}
