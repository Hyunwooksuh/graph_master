import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import problemSet from "../../asset/problemSet";
import transformInput from "../../util/transformInput";
import TreeChart from "../TreeChart/TreeChart";
import PathFind from "../Pathfind/Pathfind";

const ProblemContainer = styled.div`
  margin: 40px;
  height: 95%;
  display: grid;
  grid-template-rows: 1fr 1fr 9fr;

  .problem-title {
    text-decoration: none;
    display: inline;
    box-shadow: inset 0 -10px 0 hsla(53, 90%, 83%, 0.93);
  }

  .description {
    font-size: 15px;
    font-weight: bold;
  }

  .test-case-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    font-size: 12px;
  }

  .unique-test-case {
    display: grid;
    width: 50%;
    grid-template-rows: 0.3fr 6fr 1fr;
  }

  .case-number {
    display: flex;
    justify-content: center;
    height: 80%;
  }

  .input-output {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

export default function Problem() {
  const { currentProblem } = useSelector((state) => state.problem);
  const { title, description, cases } = problemSet[currentProblem];
  const { isDebugging } = useSelector((state) => state.debug);

  return (
    currentProblem && (
      <ProblemContainer>
        <h1 className="problem-title">{title}</h1>
        <div className="description">{description}</div>
        {cases && (
          <div className="test-case-container">
            {cases.map((uniqueCase, index) => {
              if (index === 0) {
                return;
              }
              const { shortInput, answer, nativeInput } = uniqueCase;

              const data = transformInput(nativeInput, isDebugging);

              return (
                <div className="unique-test-case" key={shortInput}>
                  <div className="case-number">
                    <h2>Example {index}</h2>
                  </div>
                  <div className="tree-chart">
                    <TreeChart data={data} />
                  </div>
                  <div className="input-output">
                    <div>Input: {shortInput}</div>
                    <div>Output: {answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!cases && <PathFind />}
      </ProblemContainer>
    )
  );
}
