import Interpreter from "./interpreter";
import problemSet from "../asset/problemSet";

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

  const wrapper = function log(value) {
    return console.log(value);
  };

  interpreter.setProperty(pseudoConsole, "log", interpreter.createNativeFunction(wrapper));
};

export default function answerChecker(code, type) {
  // 커스텀 파서 구현 이후, syntax 에러 핸들링 추가
  const testCases = problemSet[type].cases;

  for (let i = 0; i < testCases.length; i++) {
    const { input } = testCases[i];
    const fullCode = `${code}
  const input = ${input}
  GRAPH_MASTER(input);`;

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
        };
      }
    }
  }

  return {
    result: true,
    case: testCases[testCases.length - 1],
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
