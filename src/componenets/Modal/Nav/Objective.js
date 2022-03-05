import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  .objective {
    display: flex;
    justify-content: center;
  }

  .debugging-problem {
    display: flex;
    justify-content: center;
  }
`;

export default function Objective() {
  const objective = useSelector((state) => state.modal.objective);
  const problem = useSelector((state) => state.problem.currentProblem);

  return (
    <Wrapper>
      <h2 className="objective">디버깅 목표</h2>
      <div className="debugging-problem" />
      <div className="debugging-testcase" />
    </Wrapper>
  );
}
