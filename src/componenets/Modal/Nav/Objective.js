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

  .debugging-explain {
    font-weight: bold;
  }

  .debugging-testcase {
    background: white;
    display: grid;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
  }
`;

export default function Objective() {
  const objective = useSelector((state) => state.modal.objective);

  return (
    <Wrapper>
      <h2 className="objective">디버깅 목표 🧐</h2>
      <div className="debugging-explain">
        성공한 경우 마지막 테스트 케이스로 디버깅이 진행되며, 실패한 경우 실패한 테스트 케이스로
        디버깅이 진행됩니다.
      </div>
      <div className="debugging-testcase">
        <div>INPUT: {objective.shortInput}</div>
        <div>OUTPUT: {objective.answer}</div>
      </div>
    </Wrapper>
  );
}
