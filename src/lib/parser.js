/* eslint-disable no-eval */
import { EnhancedInterpreter } from "./enhancedInterpreter";
import { ARRAY_EXPRESSION, ASSIGNMENT_EXPRESSION, BINARY_EXPRESSION } from "../constant/parser";

const windowProperties = [
  "alert",
  "self",
  "window",
  "Infinity",
  "Array",
  "Boolean",
  "Date",
  "Error",
  "EvalError",
  "Function",
  "JSON",
  "Math",
  "NaN",
  "Number",
  "Object",
  "RangeError",
  "ReferenceError",
  "RegExp",
  "String",
  "SyntaxError",
  "TypeError",
  "URIError",
  "constructor",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "this",
  "undefined",
  "undefined",
  "console",
];

function getScopeInformation(state) {
  const { properties } = state.scope.object;
}

function getNodeValue(state) {
  const { node } = state;
  switch (node.type) {
    case ARRAY_EXPRESSION:
      return node.elements.map((node) => getNodeValue(node));
    case ASSIGNMENT_EXPRESSION:
      if (state.doneLeft_ && state.doneRight_) {
        return {
          left: node.leftReference_[node.leftReference_.length - 1],
          value: node.value,
        };
      }
      break;
    case BINARY_EXPRESSION:
      if (state.doneLeft_ && state.doneRight_) {
        const result = eval(`${state.leftValue_} ${node.operator} ${state.value}`);
        return {
          result,
          left: getNodeValue(node.left),
          right: getNodeValue(node.right),
          operator: node.operator,
          leftValue: state.leftValue_,
          rightValue: state.value,
        };
      }
      break;

    default:
      break;
  }
}
