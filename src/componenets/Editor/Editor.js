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
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsOpen } from "../../redux/slices/modalSlice";
import problemSet from "../../asset/problemSet";
import answerChecker from "../../lib/answerChecker";

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

  const dispatch = useDispatch();
  const { currentProblem } = useSelector((state) => state.problem);
  const { isDebugging } = useSelector((state) => state.debug);
  const problem = problemSet[currentProblem];
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (problem) {
      setValue(problem.template);
    }
  }, [problem]);

  const handleClickSubmit = (userCode) => {
    // value에 저장된 값 제출하면됨 -> 현재 문제 삭제 dispatch
    const result = answerChecker(userCode, currentProblem);

    if (result) {
      if (typeof result === "object") {
        return dispatch(setIsOpen(result));
      }

      dispatch(setIsOpen("Correct"));
    } else {
      dispatch(setIsOpen("Incorrect"));
    }
  };

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
          <button className="submit-button" onClick={handleClickSubmit.bind(this, value)}>
            ⏩ SUBMIT CODE
          </button>
        </div>
      )}
    </Wrapper>
  );
}
