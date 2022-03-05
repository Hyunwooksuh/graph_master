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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsOpen, setObjective } from "../../redux/slices/modalSlice";
import problemSet from "../../asset/problemSet";
import answerChecker, {
  initFunc,
  EnhancedInterpreter,
  getLineAndCharObject,
} from "../../lib/enhancedInterpreter";
import { setSubmittedCode } from "../../redux/slices/problemSlice";

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

  .debugging-button-container {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
  }

  .debugging-button {
    display: flex;
    justify-content: center;
    width: 40%;
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
  const { currentProblem, submittedCode } = useSelector((state) => state.problem);
  const { isDebugging } = useSelector((state) => state.debug);
  const problem = problemSet[currentProblem];

  const debuggingTarget = new EnhancedInterpreter(submittedCode, initFunc);
  const objective = useSelector((state) => state.modal.objective);

  const [userCode, setUserCode] = useState("");
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const graphEditor = useRef();
  const markers = [];

  useEffect(() => {
    setUserCode(submittedCode);
  }, [submittedCode]);

  useEffect(() => {
    dispatch(setSubmittedCode(userCode));
  }, [userCode]);

  useEffect(() => {
    if (problem) {
      dispatch(setSubmittedCode(problem.template));
    }
  }, [problem]);

  const handleClickSubmit = (userCode) => {
    const submitResult = answerChecker(userCode, currentProblem);

    dispatch(setSubmittedCode(userCode));

    if (submitResult.result) {
      if (typeof result === "object") {
        return dispatch(setIsOpen(submitResult.result));
      }

      dispatch(setObjective(submitResult.case));
      dispatch(setIsOpen("Correct"));
    } else {
      dispatch(setObjective(submitResult.case));
      dispatch(setIsOpen("Incorrect"));
    }
  };

  const handleClickPrevStep = () => {};
  const handleClickNextStep = () => {
    const debuggingInfo = debuggingTarget.nextStep();
    const offset = getLineAndCharObject(submittedCode, debuggingInfo.range);

    if (debuggingInfo.raw.node.name === "input" && isDebugging) {
      const pseudoObj = debuggingTarget.nativeToPseudo(objective.nativeInput);
      debuggingTarget.setValueToScope("input", pseudoObj);
    }

    if (markers.length) {
      markers.forEach((marker) => marker.clear());
    }

    if (offset[0] && offset[1]) {
      const marker = graphEditor.current.editor.doc.markText(offset[0], offset[1], {
        css: "background : yellow",
      });

      markers.push(marker);
    }

    if (!debuggingInfo.hasNextStep) {
      setNextButtonDisabled(true);
    }
  };

  return (
    <Wrapper>
      <CodeMirror
        ref={graphEditor}
        className="CodeMirror"
        value={userCode}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setUserCode(value);
        }}
      />
      {!isDebugging && currentProblem && (
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleClickSubmit.bind(this, submittedCode)}>
            ⏩ SUBMIT CODE
          </button>
        </div>
      )}
      {isDebugging && (
        <div className="debugging-button-container">
          <button
            disabled={prevButtonDisabled}
            className="debugging-button"
            onClick={handleClickPrevStep}
          >
            PREV STEP
          </button>
          <button
            disabled={nextButtonDisabled}
            className="debugging-button"
            onClick={handleClickNextStep}
          >
            NEXT STEP
          </button>
        </div>
      )}
    </Wrapper>
  );
}
