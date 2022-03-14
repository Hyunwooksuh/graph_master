import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setIsOpen } from "../../redux/slices/modalSlice";

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
  left: 50%;
  width: 35rem;
  height: 30rem;
  transform: translate(-50%, -40%);
  background-color: beige;
  z-index: 1000;
  padding: 40px;
  border-radius: 20px;
  background: #da70d6;
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export default function Modal({ open, children }) {
  const dispatch = useDispatch();
  const handleClickMenu = () => {
    dispatch(setIsOpen());
  };

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <OverlayStyle onClick={handleClickMenu} />
      <ModalStyle>{children}</ModalStyle>
    </>,
    document.getElementById("modal"),
  );
}
