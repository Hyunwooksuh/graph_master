import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 3fr 4fr 1fr;

  .error-result {
    display: flex;
    justify-content: center;
  }

  .error-modal-description {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background: white;
    color: red;
    border-radius: 40px;
    padding: 18px;
  }

  .error-modal-button {
    margin: 20px;
    border-radius: 20px;
    font-size: 17px;
    font-weight: bold;
    background: tomato;
  }
`;

export default function Error() {
  const { error } = useSelector((state) => state.modal);

  return (
    <Wrapper>
      <h2 className="error-result">😬 에러 발생 ! 😬</h2>
      <div className="error-modal-description">{error}</div>
    </Wrapper>
  );
}
