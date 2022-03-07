import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Editor from "../Editor/Editor";
import Modal from "../Modal/Modal";
import NavBar from "../NavBar/NavBar";
import Problem from "../Problem/Problem";
import Objective from "../Modal/Nav/Objective";
import Tutorial from "../Modal/Nav/Tutorial";
import Correct from "../Modal/Result/Correct";
import Incorrect from "../Modal/Result/Incorrect";
import Error from "../Modal/Result/Error";

const PageWrapper = styled.div`
  display: flex;

  padding: 15px;
  height: 85%;
  width: 100%;

  .editorSection {
    width: 30%;
    display: grid;
    grid-template-rows: 1fr 11fr;
  }

  .visualizationSection {
    width: ${(props) => (props.isDebugging && props.currentScope ? "47%" : "70%")};
    margin: 0 1%;
    background-color: white;
    border-radius: 20px;
  }

  .consoleSection {
    width: 19%;
    background-color: white;
    border-radius: 20px;
  }

  .scope-name {
    margin: 1px;
  }

  .scope-element {
    margin: 5px;
    display: grid;
  }

  .scope-element-key {
    color: purple;
    font-weight: bold;
  }

  .scope-element-value {
    font-size: 12px;
  }
`;

export default function EditPage() {
  const { isOpen, currentModal } = useSelector((state) => state.modal);
  const { isDebugging } = useSelector((state) => state.debug);
  const { currentProblem } = useSelector((state) => state.problem);
  const { currentScope } = useSelector((state) => state.scope);

  return (
    <>
      <PageWrapper isDebugging={isDebugging} currentScope={currentScope}>
        <div className="editorSection">
          <NavBar />
          <Editor />
        </div>
        <div className="visualizationSection">{currentProblem && !isDebugging && <Problem />}</div>
        {isDebugging && currentScope && (
          <div className="consoleSection">
            <div className="scope-name">
              <h3>{currentScope.length && currentScope[0]} Scope</h3>
            </div>
            <div>
              {currentScope.length &&
                Object.entries(currentScope[1]).map((element) => {
                  const [key, value] = [element[0], element[1]];

                  if (key === "scopeName") {
                    return;
                  }

                  return (
                    <div className="scope-element" key={key}>
                      <div className="scope-element-key">{key}</div>
                      <div className="scope-element-value">타입: {value.type}</div>
                      <div className="scope-element-value">값: {value.value}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </PageWrapper>
      <Modal open={isOpen}>
        {currentModal === "Tutorial" && <Tutorial />}
        {currentModal === "Objective" && <Objective />}
        {currentModal === "Correct" && <Correct />}
        {currentModal === "Incorrect" && <Incorrect />}
        {typeof currentModal === "object" && <Error />}
      </Modal>
    </>
  );
}
