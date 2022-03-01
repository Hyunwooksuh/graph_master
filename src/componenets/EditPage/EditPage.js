import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Editor from "../Editor/Editor";
import Modal from "../Modal/Modal";
import NavBar from "../NavBar/NavBar";
import Problem from "../Problem/Problem";
import Help from "../Modal/Nav/Help";
import Objective from "../Modal/Nav/Objective";
import Tutorial from "../Modal/Nav/Tutorial";

const PageWrapper = styled.div`
  display: flex;
  padding: 20px;
  height: 85%;

  .editorSection {
    width: 30%;
    display: grid;
    grid-template-rows: 1fr 11fr;
  }

  .visualizationSection {
    width: 55%;
    margin: 0 2%;
    background-color: white;
    border-radius: 20px;
  }

  .consoleSection {
    width: 15%;
    background-color: white;
    border-radius: 20px;
  }
`;

export default function EditPage() {
  const { isOpen, currentModal } = useSelector((state) => state.modal);
  return (
    <>
      <PageWrapper>
        <div className="editorSection">
          <NavBar />
          <Editor />
        </div>
        <div className="visualizationSection">
          <Problem />
        </div>
        <div className="consoleSection" />
      </PageWrapper>
      <Modal open={isOpen}>
        {currentModal === "Tutorial" && <Tutorial />}
        {currentModal === "Objective" && <Objective />}
        {currentModal === "Help" && <Help />}
      </Modal>
    </>
  );
}
