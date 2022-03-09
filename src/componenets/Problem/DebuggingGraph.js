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
  const { currentOutput } = useSelector((state) => state.scope);

  const data = transformInput(nativeInput, isDebugging);
  const traversedData = traversal(data, currentProblem);
  applyOutput(traversedData, currentOutput);

  return (
    <ChartWrapper>
      <TreeChart data={traversedData} />
    </ChartWrapper>
  );
}

function applyOutput(data, outputState) {
  const modifiedData = data;
  applyOutputHelper(modifiedData, outputState);

  return modifiedData;

  function applyOutputHelper(node, output) {
    if (!node || !output) {
      return;
    }

    const keys = Object.keys(output);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "length") {
        if (Number(keys[i]) === node.priority) {
          node.name = output[keys[i]];
          break;
        }
      }
    }

    if (node.children && node.children[0]) {
      applyOutputHelper(node.children[0], output);
    }

    if (node.children && node.children[1]) {
      applyOutputHelper(node.children[1], output);
    }
  }
}
