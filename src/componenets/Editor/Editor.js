import { Controlled as CodeMirror } from "react-codemirror2";
import { JSHINT } from "jshint";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "./Editor.css";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import styled from "styled-components";
import { setError, setIsOpen, setObjective } from "../../redux/slices/modalSlice";
import { setSubmittedCode, togglePathVisualize } from "../../redux/slices/problemSlice";
import {
  setScopeProperties,
  setSerializedText,
  decrementStepCount,
  incrementStepCount,
  setCurrentScope,
  setDidClickPrev,
  setCurrentOutput,
  setOptPath,
  setVisitedNodes,
} from "../../redux/slices/scopeSlice";
import { serialize, deserialize } from "../../lib/serialize";
import treeAnswerChecker, {
  pathAnswerChecker,
  initFunc,
  EnhancedInterpreter,
  getLineAndCharObject,
} from "../../lib/enhancedInterpreter";
import getScopeInformation from "../../lib/parser";
import { markUserVisitedPath, clearPath } from "../Pathfind/Pathfind";
import { COLUMNS, ROWS } from "../../constant/pathFind";

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
  const { currentProblem, submittedCode, currentKind } = useSelector((state) => state.problem);
  const { isDebugging } = useSelector((state) => state.debug);
  const objective = useSelector((state) => state.modal.objective);
  const { serializedText, currentScope, stepCount, scopeHistory, didClickPrev, initialGrid } =
    useSelector((state) => state.scope);

  const debuggingTarget = new EnhancedInterpreter(
    submittedCode,
    initFunc,
    currentScope && currentScope[0],
  );

  const [userCode, setUserCode] = useState("");
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const graphEditor = useRef();

  useEffect(() => {
    setUserCode(submittedCode);
  }, [stepCount, submittedCode]);

  useEffect(() => {
    if (stepCount < 0) {
      setPrevButtonDisabled(true);
      setNextButtonDisabled(false);
    } else {
      setPrevButtonDisabled(false);
      setNextButtonDisabled(false);
    }
  }, [stepCount]);

  const handleClickSubmit = ([userCode, currentKind]) => {
    let submitResult = null;
    if (currentKind === "tree") {
      submitResult = treeAnswerChecker(userCode, currentProblem);
    } else if (currentKind === "path") {
      submitResult = pathAnswerChecker(userCode, currentProblem);
    }

    dispatch(setSubmittedCode(userCode));

    if (submitResult.error) {
      batch(() => {
        dispatch(setIsOpen("Error"));
        dispatch(setError(submitResult.error));
      });

      return;
    }

    if (submitResult.result) {
      batch(() => {
        dispatch(setObjective({ case: submitResult.case, group: submitResult.group }));
        dispatch(setIsOpen("Correct"));

        // path finder result
        if (submitResult.path.opt_path && submitResult.path.visited_nodes) {
          batch(() => {
            dispatch(
              setOptPath({
                opt_path: submitResult.path.opt_path,
              }),
            );
            dispatch(
              setVisitedNodes({
                visited_nodes: submitResult.path.visited_nodes,
              }),
            );
          });
        }
      });
    } else {
      batch(() => {
        dispatch(setObjective({ case: submitResult.case, group: submitResult.group }));
        dispatch(setIsOpen("Incorrect"));

        // path finder result
        if (submitResult.path.opt_path && submitResult.path.visited_nodes) {
          batch(() => {
            dispatch(
              setOptPath({
                opt_path: submitResult.path.opt_path,
              }),
            );
            dispatch(
              setVisitedNodes({
                visited_nodes: submitResult.path.visited_nodes,
              }),
            );
          });
        }
      });
    }
  };

  const handleClickPrevStep = () => {
    if (graphEditor.current.editor.doc.getAllMarks()) {
      graphEditor.current.editor.doc.getAllMarks().forEach((marker) => marker.clear());
    }

    let prevOffset = null;
    if (scopeHistory[stepCount - 1]) {
      prevOffset = scopeHistory[stepCount - 1].offset;
    }

    if (prevOffset && prevOffset[0] && prevOffset[1]) {
      graphEditor.current.editor.doc.markText(prevOffset[0], prevOffset[1], {
        css: "background : rgba(193, 125, 129, 0.6)",
      });
    }

    batch(() => {
      dispatch(setDidClickPrev(true));
      dispatch(decrementStepCount());
      dispatch(setCurrentScope());
      dispatch(setCurrentOutput());
    });
  };
  const handleClickNextStep = () => {
    if (didClickPrev) {
      if (graphEditor.current.editor.doc.getAllMarks()) {
        graphEditor.current.editor.doc.getAllMarks().forEach((marker) => marker.clear());
      }

      if (stepCount === scopeHistory.length - 1) {
        const prevOffset = scopeHistory[stepCount].offset;

        if (prevOffset[0] && prevOffset[1]) {
          graphEditor.current.editor.doc.markText(prevOffset[0], prevOffset[1], {
            css: "background : rgba(193, 125, 129, 0.6)",
          });
        }

        batch(() => {
          dispatch(setCurrentScope());
          dispatch(setCurrentOutput());
          dispatch(setDidClickPrev(false));
        });
        return;
      }

      if (stepCount < scopeHistory.length - 1) {
        const prevOffset = scopeHistory[stepCount + 1].offset;

        if (prevOffset[0] && prevOffset[1]) {
          graphEditor.current.editor.doc.markText(prevOffset[0], prevOffset[1], {
            css: "background : rgba(193, 125, 129, 0.6)",
          });
        }

        batch(() => {
          dispatch(incrementStepCount());
          dispatch(setCurrentScope());
          dispatch(setCurrentOutput());
        });

        return;
      }
    }

    if (serializedText) {
      const json = JSON.parse(serializedText);

      deserialize(json, debuggingTarget);
    }

    const debuggingInfo = debuggingTarget.nextStep();
    const offset = getLineAndCharObject(submittedCode, debuggingInfo.range);
    const scopeProperties = getScopeInformation(debuggingInfo.currentScope);
    const currentOutputState = debuggingInfo.observingOutput;

    let currentOutputProperties = null;
    if (currentOutputState) {
      currentOutputProperties = currentOutputState.properties;
    }

    if (typeof currentOutputState === "string") {
      currentOutputProperties = currentOutputState;
    }

    /* tree debugging scope injection */
    if (currentKind === "tree" && debuggingInfo.raw.node.name === "input" && isDebugging) {
      const pseudoObj = debuggingTarget.nativeToPseudo(objective.nativeInput);
      debuggingTarget.setValueToScope("input", pseudoObj);
    }

    if (graphEditor.current.editor.doc.getAllMarks()) {
      graphEditor.current.editor.doc.getAllMarks().forEach((marker) => marker.clear());
    }

    if (offset[0] && offset[1]) {
      graphEditor.current.editor.doc.markText(offset[0], offset[1], {
        css: "background : rgba(193, 125, 129, 0.6)",
      });
    }

    if (debuggingInfo.raw.node.type === "Program" && debuggingInfo.raw.node.body.length === 0) {
      setNextButtonDisabled(true);
      return;
    }

    batch(() => {
      dispatch(setSerializedText(JSON.stringify(serialize(debuggingTarget))));
      dispatch(
        setScopeProperties({
          offset: offset,
          scope: scopeProperties.scopeName.value,
          properties: scopeProperties,
          output: currentOutputProperties,
        }),
      );
    });
  };
  const handleClickRestart = () => {
    clearPath(ROWS, COLUMNS);
    dispatch(togglePathVisualize(true));
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
      {!isDebugging && (
        <div className="submit-button-container">
          <button
            className="submit-button"
            onClick={handleClickSubmit.bind(this, [userCode, currentKind])}
          >
            ⏩ SUBMIT CODE
          </button>
        </div>
      )}
      {isDebugging && currentKind === "tree" && (
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
      {isDebugging && currentKind === "path" && (
        <div className="debugging-button-container">
          <button className="debugging-button" onClick={handleClickRestart}>
            RESTART
          </button>
        </div>
      )}
    </Wrapper>
  );
}
