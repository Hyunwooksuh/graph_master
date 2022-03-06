import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setIsOpen } from "../../../redux/slices/modalSlice";
import { setProblem, setSubmittedCode } from "../../../redux/slices/problemSlice";
import { setIsDebugging } from "../../../redux/slices/debuggingSlice";
import problemSet from "../../../asset/problemSet";

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  .welcome-title {
    display: flex;
    justify-content: center;
  }

  .welcome-description {
    display: flex;
    justify-content: center;
  }

  .problemset-button {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    button {
      margin: 10px;
      border-radius: 20px;
      font-size: 17px;
      font-weight: bold;
      background: tomato;
    }
  }
`;

export default function Tutorial() {
  const dispatch = useDispatch();

  const traversals = [
    { title: "PREORDER TRAVERSAL", kind: "preorder" },
    { title: "INORDER TRAVERSAL", kind: "inorder" },
    { title: "POSTORDER TRAVERSAL", kind: "postorder" },
    { title: "LEVELORDER TRAVERSAL", kind: "levelorder" },
  ];

  const handleSelectProblem = (traversal) => {
    const problem = problemSet[traversal];

    dispatch(setIsOpen());
    dispatch(setIsDebugging({ status: false }));
    dispatch(setProblem(traversal));
    dispatch(setSubmittedCode(`${problemSet.baseTemplate}\n${problem.template}`));
  };

  return (
    <Wrapper>
      <h2 className="welcome-title">🧩 그래프 튜토리얼에 오신 것을 환영합니다 🧩</h2>
      <div className="welcome-description">
        이제부터 여러분들은 아래 그래프 순회 문제들을 하나씩 배워가실 것입니다. 트리에는 다양한
        순회방법이 있습니다. 아래에 제시된 순회방법은 트리 순회의 대표적인 방법들입니다. 처음이라
        낯선개념이 많겠지만 차곡차곡 풀어보시기 바랍니다.
      </div>
      <div className="problemset-button">
        {traversals.map((traversal) => (
          <button key={traversal.kind} onClick={() => handleSelectProblem(traversal.kind)}>
            {traversal.title}
          </button>
        ))}
      </div>
    </Wrapper>
  );
}
