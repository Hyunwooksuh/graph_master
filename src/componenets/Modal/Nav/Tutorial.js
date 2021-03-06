import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setIsOpen } from "../../../redux/slices/modalSlice";
import { setProblem, setSubmittedCode } from "../../../redux/slices/problemSlice";
import { setIsDebugging } from "../../../redux/slices/debuggingSlice";
import problemSet from "../../../asset/problemSet";
import { resetScope, setOptPath, setVisitedNodes } from "../../../redux/slices/scopeSlice";

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

    .advanced {
      color: #ffebcd;
      background-color: #b22222;
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

    // reset basic state
    dispatch(setIsOpen());
    dispatch(setIsDebugging({ status: false }));

    // reset path problem state
    dispatch(setOptPath([]));
    dispatch(setVisitedNodes([]));

    // reset tree problem state
    dispatch(resetScope());

    if (traversal === "shortestPath") {
      dispatch(setProblem({ traversal: traversal, kind: "path" }));
      dispatch(setSubmittedCode(`${problem.baseTemplate}\n${problem.template}`));
      return;
    }

    dispatch(setProblem({ traversal: traversal, kind: "tree" }));
    dispatch(setSubmittedCode(`${problemSet.baseTemplate}\n${problem.template}`));
  };

  return (
    <Wrapper>
      <h2 className="welcome-title">???? ????????? ??????????????? ?????? ?????? ??????????????? ????</h2>
      <div className="welcome-description">
        ???????????? ??????????????? ?????? ????????? ?????? ???????????? ????????? ???????????? ????????????. ???????????? ?????????
        ??????????????? ????????????. ????????? ????????? ??????????????? ?????? ????????? ???????????? ??????????????????. ?????????
        ???????????? ????????? ??????????????? ?????? ??????????????????!
      </div>
      <div className="problemset-button">
        {traversals.map((traversal) => (
          <button key={traversal.kind} onClick={() => handleSelectProblem(traversal.kind)}>
            {traversal.title}
          </button>
        ))}
        <button className="advanced" onClick={() => handleSelectProblem("shortestPath")}>
          SHORTEST PATH
        </button>
      </div>
    </Wrapper>
  );
}
