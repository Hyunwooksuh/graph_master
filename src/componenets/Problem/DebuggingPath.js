import React from "react";
import styled from "styled-components";
import Pathfind from "../Pathfind/Pathfind";

const GridWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default function DebuggingPath() {
  return (
    <GridWrapper>
      <Pathfind />
    </GridWrapper>
  );
}
