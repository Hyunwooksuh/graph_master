import * as Babel from "@babel/standalone";
import Interpreter from "./interpreter";
import problemSet from "../asset/problemSet";
import {
  NODE_END_COL,
  NODE_END_ROW,
  NODE_START_COL,
  NODE_START_ROW,
  ROWS,
  COLUMNS,
} from "../constant/pathFind";

const arrayPrototype = [
  "at",
  "concat",
  "copyWithin",
  "entries",
  "every",
  "fill",
  "filter",
  "find",
  "findIndex",
  "flat",
  "flatMap",
  "forEach",
  "Array.from",
  "groupBy",
  "groupByToMap",
  "includes",
  "indexOf",
  "isArray",
  "join",
  "keys",
  "lastIndexOf",
  "map",
  "of",
  "pop",
  "push",
  "reduce",
  "reduceRight",
  "reverse",
  "shift",
  "slice",
  "some",
  "sort",
  "splice",
  "toLocaleString",
  "toSource",
  "toString",
  "unshift",
  "values",
];

export class EnhancedInterpreter extends Interpreter {
  constructor(code, initFunc, scopeName) {
    super(code, initFunc);
    this.code = code;

    if (!scopeName) {
      this.scopeNames = ["Global"];
    } else {
      this.scopeNames = [scopeName];
    }
    this.callee = ["window"];
  }

  runSubmittedCode() {
    const runningStartTime = Date.now();
    while (!this.paused_ && this.step()) {
      if (Date.now() - runningStartTime > 10000) {
        return "Time limit exceeded. 시간초과입니다. Infinite Loop에 대해 조사해보세요.";
      }
    }

    return this.paused_;
  }

  nextStep() {
    const hasNextStep = this.step();
    const currentState = this.stateStack[this.stateStack.length - 1];

    const { start, end } = currentState.node;
    const { properties } = currentState.scope.object;

    let observingOutput = findOutputObj(currentState);

    if (!observingOutput && currentState.node.type === "BlockStatement") {
      observingOutput = "BlockStatement";
    }

    if (currentState.node.type === "Program" && currentState.done) {
      return {
        hasNextStep,
        type: "End",
        range: [start, end],
        raw: currentState,
        observingOutput,
      };
    }

    if (
      currentState.func_ &&
      !currentState.func_.nativeFunc &&
      !arrayPrototype.includes(currentState.func_.node.id.name)
    ) {
      const { name } = currentState.func_.node.id;
      this.scopeNames.push(name);

      return {
        currentScope: {
          scopeName: this.scopeNames[this.scopeNames.length - 1] || null,
          ...properties,
        },
        hasNextStep,
        type: currentState.node.type,
        range: [start, end],
        raw: currentState,
        observingOutput,
      };
    }

    if (currentState.node.callee) {
      this.callee.push(currentState.node.callee.name);
    }

    return {
      currentScope: {
        scopeName: this.scopeNames[this.scopeNames.length - 1],
        ...properties,
        this: this.callee[this.callee.length - 1],
      },
      hasNextStep,
      type: currentState.node.type,
      range: [start, end],
      raw: currentState,
      observingOutput,
    };
  }
}

/*
  [순회 참고사항]
  parentscope -> object, parentScope 
  object -> properties
*/
const findOutputObj = function (state) {
  let result = null;
  getOutputObj(state);

  return result;

  function getOutputObj(state, dep = 0) {
    if (!state) {
      return;
    }

    let targetScope = null;
    if (dep === 0) {
      targetScope = state.scope;
    } else {
      targetScope = state;
    }

    const keys = Object.keys(targetScope);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key === "object") {
        const targetProperties = targetScope[key].properties;
        const scopeElements = Object.keys(targetProperties);

        for (let i = 0; i < scopeElements.length; i++) {
          if (scopeElements[i] === "output") {
            result = targetProperties[scopeElements[i]];
            return;
          }
        }
      }

      if (key === "parentScope") {
        getOutputObj(targetScope[key], dep + 1);
      }
    }
  }
};

export const initFunc = function (interpreter, globalObject) {
  const pseudoConsole = interpreter.nativeToPseudo({});

  interpreter.setProperty(globalObject, "console", pseudoConsole);
  interpreter.setProperty(
    pseudoConsole,
    "log",
    interpreter.createNativeFunction((...value) => {
      return console.log(...value);
    }),
  );

  interpreter.setProperty(
    globalObject,
    "includes",
    interpreter.createNativeFunction((array, value) => {
      const nativeArray = EnhancedInterpreter.prototype.arrayPseudoToNative(array);
      const nativeValue = EnhancedInterpreter.prototype.pseudoToNative(value);

      for (let i = 0; i < nativeArray.length; i++) {
        const element = nativeArray[i].properties;
        const setX = element.x;
        const setY = element.y;

        const { x, y } = nativeValue;

        if (setX === x && setY === y) {
          return true;
        }
      }

      return false;
    }),
  );

  interpreter.setProperty(
    globalObject,
    "isObjEqual",
    interpreter.createNativeFunction((a, b) => {
      const nativeA = EnhancedInterpreter.prototype.pseudoToNative(a);
      const nativeB = EnhancedInterpreter.prototype.pseudoToNative(b);

      if (nativeA.x === nativeB.x && nativeA.y === nativeB.y) {
        return true;
      }

      return false;
    }),
  );
};

export function pathAnswerChecker(code, type) {
  const fullCode = `
  const ROWS = ${ROWS};
  const COLUMNS = ${COLUMNS};
  const grid = [];

  for (let i = 0; i < ROWS; i++) {
    grid[i] = [];
  }
  
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      grid[i][j] = null;
    }
  }

  function Spot(row, column) {
    this.x = row;
    this.y = column;
    this.isStart = this.x === ${NODE_START_ROW} && this.y === ${NODE_START_COL};
    this.isEnd = this.x === ${NODE_END_ROW} && this.y === ${NODE_END_COL};
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbors = [];
    this.isWall = false;
    this.previous = null;
    this.addNeighbors = function (grid, rows, columns) {
      const i = this.x;
      const j = this.y;
  
      if (i > 0) this.neighbors.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
      if (j > 0) this.neighbors.push(grid[i][j - 1]);
      if (j < columns - 1) this.neighbors.push(grid[i][j + 1]);
    }
  };

  createSpot(grid);
  createWall(grid, ${problemSet[type].stringWall});
  updateNeighbors(grid);

  ${problemSet[type].utils.createWall}
  ${problemSet[type].utils.createSpot}
  ${problemSet[type].utils.updateNeighbors}
  ${code}
GRAPH_MASTER(grid[${NODE_START_ROW}][${NODE_START_COL}], grid[${NODE_END_ROW}][${NODE_END_COL}]);
`;

  const transformedCode = Babel.transform(fullCode, { presets: ["es2015"] }).code;
  const checker = new EnhancedInterpreter(transformedCode, initFunc);
  const isError = checker.runSubmittedCode();

  if (typeof isError === "string") {
    return {
      error: isError,
    };
  }

  const output = checker.pseudoToNative(checker.value);
  const answer = problemSet[type].output;

  for (let i = 0; i < answer.length; i++) {
    const { x, y } = answer[i];
    const outputLoc = output[i];

    if (!outputLoc) {
      return {
        result: false,
        case: problemSet[type].stringOutput,
        group: "path",
      };
    }

    if (outputLoc.x !== x && outputLoc.y !== y) {
      return {
        result: false,
        case: problemSet[type].stringOutput,
        group: "path",
      };
    }
  }

  return {
    result: true,
    case: problemSet[type].stringOutput,
    group: "path",
  };
}

export default function treeAnswerChecker(code, type) {
  const testCases = problemSet[type].cases;

  for (let i = 0; i < testCases.length; i++) {
    const { input } = testCases[i];
    const fullCode = `${code}
  GRAPH_MASTER(${input});`;

    const checker = new EnhancedInterpreter(fullCode, initFunc);
    const isError = checker.runSubmittedCode();

    if (typeof isError === "string") {
      return {
        error: isError,
      };
    }

    const output = checker.pseudoToNative(checker.value);
    const answer = testCases[i].nativeArrayAnswer;

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] !== output[i]) {
        return {
          result: false,
          case: testCases[i],
          group: "tree",
        };
      }
    }
  }

  return {
    result: true,
    case: testCases[testCases.length - 1],
    group: "tree",
  };
}

export const getLineAndCharObject = function (code, offset) {
  const [start, end] = offset;
  const lines = code.split("\n");
  const linesLength = lines.map((line) => line.length);

  let line = 0;
  let ch = 0;
  let convertedStart = null;
  let convertedEnd = null;

  for (let i = 0; i <= code.length; i++) {
    if (i === start) {
      const passedChar = linesLength
        .slice(0, line)
        .reduce((sum, lineLength) => sum + lineLength + 1, 0);

      convertedStart = {
        line: line,
        ch: ch - passedChar,
      };
    }

    if (i === end) {
      const passedChar = linesLength
        .slice(0, line)
        .reduce((sum, lineLength) => sum + lineLength + 1, 0);

      convertedEnd = {
        line: line,
        ch: ch - passedChar,
      };
    }

    if (convertedStart && convertedEnd) {
      break;
    }

    if (code[i] === "\n") {
      line++;
    }

    ch++;
  }

  return [convertedStart, convertedEnd];
};
