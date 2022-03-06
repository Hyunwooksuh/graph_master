import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import problemSet from "../../asset/problemSet";

const ProblemContainer = styled.div`
  margin: 40px;
  height: 100%;

  .problem-title {
    text-decoration: none;
    display: inline;
    box-shadow: inset 0 -10px 0 hsla(53, 90%, 83%, 0.93);
  }

  .description {
    margin-top: 50px;
    font-size: 15px;
    font-weight: bold;
  }

  .test-case-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    font-size: 12px;
  }

  .unique-test-case {
    display: grid;
    margin: 20px;
    flex-basis: 25%;
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
                  <h2>Example {index + 1}</h2>
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
