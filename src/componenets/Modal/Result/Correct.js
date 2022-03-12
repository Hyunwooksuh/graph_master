import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsDebugging } from "../../../redux/slices/debuggingSlice";
import { setIsOpen } from "../../../redux/slices/modalSlice";
import { setProblem, setSubmittedCode } from "../../../redux/slices/problemSlice";

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  .correct-result {
    display: flex;
    justify-content: center;
  }

  .correct-modal-description {
    display: flex;
    justify-content: center;
  }

  .correct-modal-button {
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

export default function Correct() {
  const dispatch = useDispatch();
  const userSubmittedCode = useSelector((state) => state.problem.submittedCode);
  const { currentKind } = useSelector((state) => state.problem);

  const handleCloseModal = () => {
    batch(() => {
      dispatch(setIsOpen());
      dispatch(setSubmittedCode(""));
      dispatch(setProblem(null));
    });
  };

  const handleStartDebugging = () => {
    batch(() => {
      dispatch(
        setIsDebugging({
          status: true,
        }),
      );

      if (currentKind === "tree") {
        dispatch(setSubmittedCode(`${userSubmittedCode}\nGRAPH_MASTER(input);`));
      } else if (currentKind === "path") {
        dispatch(setSubmittedCode(`${userSubmittedCode}\nGRAPH_MASTER(startSpot, endSpot);`));
      }

      dispatch(setIsOpen());
    });
  };

  return (
    <Wrapper>
      <h2 className="correct-result">🥳 성공하셨네요 ! 🥳</h2>
      <div className="correct-modal-description">
        이제 풀이를 구체적으로 시각화하면서 연습해보세요. 만약 재귀로 풀었다면 재귀호출에 진입하거나
        빠져나올 때 괄호의 위치 등 세세한 부분에 집중해보세요. 특히, Leaf 부분에서 리턴될 때와 같은
        edge case를 눈여겨보세요
      </div>
      <div className="correct-modal-button">
        <button onClick={handleCloseModal}>아뇨, 다른 문제를 풀겠습니다.</button>
        <button onClick={handleStartDebugging}>네, 디버깅을 해보겠습니다.</button>
      </div>
    </Wrapper>
  );
}
