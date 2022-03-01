import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import problemSet from "../../asset/problemSet";

const ProblemContainer = styled.div`
  margin: 40px;

  .problem-title {
    text-decoration: none;
    display: inline;
    box-shadow: inset 0 -10px 0 hsla(53, 90%, 83%, 0.93);
  }

  .description {
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
  }

  .test-case-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .unique-test-case {
    display: grid;
    margin: 50px;
  }
`;

export default function Problem() {
  const { currentProblem } = useSelector((state) => state.problem);
  const { title, description, cases } = problemSet[currentProblem];

  return (
    currentProblem && (
      <ProblemContainer>
        <h1 className="problem-title">{title}</h1>
        <div className="description">{description}</div>
        <div className="test-case-container">
          {cases.map((uniqueCase, index) => {
            const { shortInput, answer } = uniqueCase;

            return (
              <div className="unique-test-case" key={shortInput}>
                <div>
                  <h3>Example {index + 1}</h3>
                </div>
                <div>Input: {shortInput}</div>
                <div>Output: {answer}</div>
              </div>
            );
          })}
        </div>
      </ProblemContainer>
    )
  );
}
