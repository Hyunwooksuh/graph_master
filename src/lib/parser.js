/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty */
/* eslint-disable no-eval */
import { ARRAY_EXPRESSION, ASSIGNMENT_EXPRESSION, BINARY_EXPRESSION } from "../constant/parser";
import { EnhancedInterpreter } from "./enhancedInterpreter";

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

export default function getScopeInformation(scope) {
  const nativeLocalScope = {};

  for (const property in scope) {
    if (!windowProperties.includes(property)) {
      const [key, value] = [property, scope[property]];
      if (!value) {
        continue;
      }

      nativeLocalScope[key] = pseudoToNative(value);

      if (value && typeof value === "object") {
        if (key === "this") {
          nativeLocalScope[key] = {
            type: "Object",
            value: value.properties.window ? "window" : scope.scopeName,
          };
        } else if (key === "arguments") {
          nativeLocalScope[key] = {
            type: "Argument",
            value: `${value.properties[0]}`,
          };
        } else if (value && value.class === "Function") {
          nativeLocalScope[key] = {
            type: "Function",
            value: value.class,
          };
        } else if (value.class === "Array") {
          nativeLocalScope[key] = {
            type: "Array",
            value: arrayToString(value),
          };
        } else {
          let obj = "{";
          for (const [propertyKey, propertyValue] of Object.entries(pseudoToNative(value))) {
            if (typeof propertyValue === "number" || typeof propertyValue === "string") {
              if (!propertyValue) {
                obj += ` ${propertyKey}: null, `;
                continue;
              }
              obj += ` ${propertyKey}: ${propertyValue}, `;
            } else if (getClassType(propertyValue) === "Array") {
              obj += ` ${propertyKey}: ${arrayToString(propertyValue)}, `;
            } else {
              const propertiesValue = NativeNestedObjectToPseudoObject(propertyValue);
              if (!propertiesValue.length) {
                obj += ` ${propertyKey}: ${NativeNestedObjectToPseudoObject(propertyValue)}`;
              } else {
                obj += ` ${propertyKey}: null`;
              }
            }
          }
          obj += "}";
          nativeLocalScope[key] = {
            type: typeof value.properties,
            value: `${obj}`,
          };
        }
      } else {
        nativeLocalScope[key] = {
          type: typeof value,
          value: `${value}`,
        };
      }
    }
  }

  return nativeLocalScope;
}

export function arrayToString(node) {
  return `[${Object.values(node.properties)}]`;
}

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function pseudoToNative(node) {
  return EnhancedInterpreter.prototype.pseudoToNative(node);
}

function NativeNestedObjectToPseudoObject(node) {
  const shortenedInput = [];
  function getShortenedInput(input) {
    if (!input) {
      return;
    }
    shortenedInput.push(input.val);

    getShortenedInput(input.left);
    getShortenedInput(input.right);
  }

  getShortenedInput(node);
  return `${shortenedInput}`;
}

// 보류
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
