import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  .error-result {
    display: flex;
    justify-content: center;
  }

  .error-modal-description {
    display: flex;
    justify-content: center;
    font-size: 14px;
    background: white;
    color: red;
  }

  .error-modal-button {
    margin: 10px;
    border-radius: 20px;
    font-size: 17px;
    font-weight: bold;
    background: tomato;
  }
`;

export default function Error() {
  const currentError = useSelector((state) => state.modal.currentModal);

  return (
    <Wrapper>
      <h2 className="error-result">에러 발생 !</h2>
      <div className="error-modal-description">{currentError.error}</div>
      <button className="error-modal-button">문제 다시 도전하기</button>
    </Wrapper>
  );
}
