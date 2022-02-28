import Interpreter from "./interpreter";

class EnhancedInterpreter extends Interpreter {
  constructor(code, initFunc) {
    super(code, initFunc);
    this.code = code;
    this.scopeNames = ["Global"];
    this.callee = ["window"];
  }

  injectInput(input) {}

  appendExecutionCode() {}
}

// variableDeclaration, FunctionDeclaration, ExpressionStatement
// VariableDeclarator, Identifier
