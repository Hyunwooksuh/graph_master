import Interpreter from "./interpreter";
import problemSet from "../asset/problemSet";

export class EnhancedInterpreter extends Interpreter {
  constructor(code, initFunc) {
    super(code, initFunc);
    this.code = code;
    this.scopeNames = ["Global"];
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

    if (currentState.node.type === "Program" && currentState.done) {
      return {
        raw: currentState,
        hasNextStep,
        type: "End",
        range: [start, end],
      };
    }

    if (currentState.func_ && currentState.doneExec_) {
      const { name } = currentState.func_.node.id;
      this.scopeNames.push(name);
      return {
        currentScope: {
          scopeName: this.scopeNames[this.scopeNames.length - 2] || null,
          ...currentState.scope.object.properties,
        },
        raw: currentState,
        hasNextStep,
        type: currentState.node.type,
        range: [start, end],
      };
    }

    if (currentState.node.callee) {
      this.callee.push(currentState.node.callee.name);
    }

    return {
      currentScope: {
        scopeName: this.scopeNames[this.scopeNames.length - 1],
        ...currentState.scope.properties,
        this: this.callee[this.callee.length - 1],
      },
      raw: currentState,
      hasNextStep,
      type: currentState.node.type,
      range: [start, end],
    };
  }
}

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
        return false;
      }
    }
  }

  return true;
}

export const initFunc = function (interpreter, globalObject) {
  const pseudoConsole = interpreter.nativeToPseudo({});

  interpreter.setProperty(globalObject, "console", pseudoConsole);

  const wrapper = function log(value) {
    return console.log(value);
  };

  interpreter.setProperty(pseudoConsole, "log", interpreter.createNativeFunction(wrapper));
};
