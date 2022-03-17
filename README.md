# 🧩 Graph master

**Graph master**는 트리 및 그래프 순회를 처음 접하는 학습자가 시각화와 함께 그래프 순회를 학습할 수 있는 어플리케이션입니다.

## 📌 Table Contents
- 기획의도
- 기능 및 사용방법
- 기술스택
- 참고사항
- 프로젝트 스케줄
- 문제 

## 💡 기획의도

- 처음 알고리즘을 접할 때 누구나 그래프 순회를 거쳐가게 됩니다. 저의 경우 코드를 따라감과 동시에 직접 그래프를 그려가며 배우는 방법이 가장 효율적이었는데, 이러한 학습경험을 공유하여 다른 학습자들의 러닝커브를 줄이는데 조금이나마 기여해보고 싶어 시작해보게 되었습니다.
- 재귀 호출(Recursive call)을 배울 때에는 어떤 부분의 Syntax에서 현재 어떤 Node의, 어떤 Scope를 적용받고 있는지, Return 함수 이후 어느 부분으로 되돌아가는 지가 헷갈린 적이 많은데, 각 Syntax마다 Scope를 볼 수 있다면 좋지 않을까 라는 생각이 들곤 했습니다.
- 추후 몇 사람이라도 제 어플리케이션으로 학습하면서 러닝커브를 줄일 수 있다면 뿌듯한 경험이 될 것 같다는 생각이 들었습니다.

## ⚙️ 기능 및 사용방법
- `Tutorials`: 사용자들은 4가지 기본문제와 1가지 고난도 문제에 도전할 수 있습니다. 4가지 기본 문제는 대표 트리순회(Preorder, Inorder, Postorder, Levelorder)문제로 이루어져있습니다. 심화문제의 경우 A* 알고리즘을 구현하는 문제입니다.
- `Help`: 트리문제 노드구조, 문제풀이 방법, 추가메소드, 디버깅 등에 대한 설명이 명시되어있습니다.
- 제시된 Boiler template 안에 코드 작성 가능하며, Output 배열에 답안을 push하여 제출하면 채점이 이뤄지게 됩니다.
- 심화문제의 경우, visitedNodes 배열 및 Output 배열 2가지에 답안을 push하여 제출한 경우에 시각화가 이뤄집니다.
- Infinite Loop 등 Run time error 및 Syntax 에러가 아닌 경우, 답안이 채점되며 정오답에 관계없이 디버깅이 가능합니다.
- Next와 Prev 버튼을 통해 앞뒤로 확인하며 디버깅이 가능하며, 디버깅되는 Syntax에 맞는 Scope를 콘솔을 통해 확인할 수 있습니다.

## 🛠 기술스택
**Client**
- ES2015+
- React
- Redux
- Toolkit

**Third Party**
- Acorn
- JS Interpreter
- Codemirror
- D3
- Immer

**Test**
- Jest

**Deploy**
- Netlify

## 🏷 참고사항
- **실행 환경** 
  - 데스크톱 환경에서의 실행을 권장합니다.
- **인터프리터**
  - JS interpreter의 경우 native javascript 대비 성능이 크게 낮아, A star 알고리즘의 경우 5x5 이상의 Grid 순회는 적용하지 못하였습니다. 실질적인 개발기간이 2주이므로 interpreter 교체 등 해당 알고리즘 성능 개선의 경우 2차 과업으로 남겨두었습니다.
- **심화 문제**
  - A star 알고리즘 문제의 Grid의 각 요소는 아래와 같은 `Spot class`의 생성자입니다.
  - 심화문제인 A star 알고리즘의 경우 트리문제와 달리 디버깅은 되지 않고 시각화만 가능한 상황인데, 이는 Grid의 모든 요소를 `native object`를 `pseudo object`로 변경시켜주는 과정에서 callstack 초과문제가 일어나는 문제로 인한 것입니다. 마찬가지로 실질적인 개발기간을 고려하여, 2차 과업으로 남겨두었습니다.

```javascript
class Spot {
  constructor(row, column) {
    this.x = row;
    this.y = column;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbors = [];
    this.isWall = false;
    this.previous = null;
  }
```

## 🗓 Project-Schedule
전체 기간 **2022.2.21(일) ~ 2022.3.13(일)** 총 3주 

### `1st week - planning`

- 아이디어 구상, 기술스택 검토 
- [Figma를 통한 Mockup 작업](https://www.figma.com/file/wIM9YsSHdXrro1kUCsRX5O/recursive-call-debugger?node-id=0%3A1)
- GitHub Repository 만들기
- Create-react-app 등 초기 세팅 

### `2nd week - developing`
- AST 구조 학습 및 커스텀 parser, interpreter 제작
- 채점 로직 구현(Tree, Path algorithm)
- 디버깅 구현을 위한 Serializing 기능 도입
- Treechart, Pathfind 시각화 구현 
- Code Editor 구축 

### `3rd week - developing & testing & deploying`
- Refactoring & styling 
- Test code 작성
- Netlify를 통한 배포 

## 🔑 문제해결
- **채점 로직 구현**: 
  - 채점로직은 아래와 같이 고차함수를 토대로 구현하였습니다. 사용자의 답안배열과 함수코드를 받기에 가장 효율적이라고 생각하였습니다. `GRAPH_MASTER` 함수에서는 `Output`배열 및 선택한 문제에 대한 함수 및 
함수실행문을 포함하도록 하였고, 추후 채점 함수에서는 `GRAPH_MASTER`함수 실행문 및 `input`을 Scope에 주입하여, interpreting 하도록 하였습니다. 

```
function GRAPH_MASTER(input) {
  const output = [];
  function preorderTraversal(node) {
    // your code
  
  }
  
  preorderTraversal(input);
  return output; 
};
```
