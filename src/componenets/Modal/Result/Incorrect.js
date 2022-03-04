import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsDebugging } from "../../../redux/slices/debuggingSlice";
import { setIsOpen } from "../../../redux/slices/modalSlice";
import { setSubmittedCode, setProblem } from "../../../redux/slices/problemSlice";

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  .incorrect-result {
    display: flex;
    justify-content: center;
  }

  .incorrect-modal-description {
    display: flex;
    justify-content: center;
  }

  .incorrect-modal-button {
    display: flex;
    justify-content: space-evenly;

    button {
      margin: 10px;
      border-radius: 20px;
      font-size: 17px;
      font-weight: bold;
      background: tomato;
    }
  }
`;

export default function Incorrect() {
  const dispatch = useDispatch();
  const userSubmittedCode = useSelector((state) => state.problem.submittedCode);
  const handleCloseModal = () => {
    dispatch(setIsOpen());
    dispatch(setSubmittedCode(""));
    dispatch(setProblem(null));
  };

  const handleStartDebugging = () => {
    dispatch(
      setIsDebugging({
        status: true,
      }),
    );

    dispatch(
      setSubmittedCode(`${userSubmittedCode}
GRAPH_MASTER(input);
    `),
    );
    // input 값 스코프에 주입

    dispatch(setIsOpen());
  };
  return (
    <Wrapper>
      <h2 className="incorrect-result">이번에는 답을 맞추지 못하셨네요 🥲</h2>
      <div className="incorrect-modal-description">
        그래프 순회는 까다로운 개념입니다. 꾸준한 시각화에 답이 있습니다. 디버깅을 시도해보세요!
        만약 재귀로 풀었다면 재귀호출에 진입하거나 빠져나올 때 괄호의 위치 등 세세한 부분에
        집중해보세요. 특히, Leaf 부분에서 리턴될 때와 같은 edge case를 눈여겨보세요
      </div>
      <div className="incorrect-modal-button">
        <button onClick={handleCloseModal}>아뇨, 다른 문제를 풀겠습니다.</button>
        <button onClick={handleStartDebugging}>네, 디버깅을 해보겠습니다.</button>
      </div>
    </Wrapper>
  );
}
