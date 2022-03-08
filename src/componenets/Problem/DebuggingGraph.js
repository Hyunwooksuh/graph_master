import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import transformInput from "../../util/transformInput";
import TreeChart from "../TreeChart/TreeChart";
import traversal from "../../util/traversal";

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default function DebuggingGraph() {
  const { nativeInput } = useSelector((state) => state.modal.objective);
  const { currentProblem } = useSelector((state) => state.problem);
  const { isDebugging } = useSelector((state) => state.debug);

  const data = transformInput(nativeInput, isDebugging);
  const traversedData = traversal(data, currentProblem);

  return (
    <ChartWrapper>
      <TreeChart data={traversedData} />
    </ChartWrapper>
  );
}
