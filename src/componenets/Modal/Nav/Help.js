import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 3fr;

  .help {
    display: flex;
    justify-content: center;
  }

  .help-explain {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-weight: bold;
    background-color: floralwhite;
    border-radius: 40px;
    padding: 3%;

    .help-details {
      font-weight: normal;
      font-size: 12px;
    }
  }
`;

export default function Help() {
  return (
    <Wrapper>
      <h2 className="help">🤓 도움말 🤓</h2>
      <div className="help-explain">
        <div>
          <div>🙋‍♂️ 트리문제 노드구조</div>
          <p className="help-details">
            트리문제의 노드 구조의 경우, 문제에는 축소된 형태로 [1, 2, 3]과 같이 제시되어있지만,
            실제로는 TreeNode구조에 따라 Nested된 형태를 띄고 있습니다. 예를 들면, 첫번째 노드의
            경우 value가 1이고 left는 2를 value로 가지는 child 노드이며, right의 경우에도 3을
            value로 가지는 child 노드로 보시면 됩니다.
          </p>
        </div>
        <div>
          <div>🙋‍♂️ 문제풀이</div>
          <p className="help-details">
            그래프 순회를 거치시면서 제시된 OUTPUT 배열에 value를 push하시고 제출하시면 됩니다.
            심화문제의 경우, visited nodes에도 입력 부탁드립니다.
          </p>
        </div>
        <div>
          <div>🙋‍♂️ 디버깅</div>
          <p className="help-details">
            무한루프와 같은 런타임 에러의 경우 팝업창에서 확인 가능하며, 구문(Syntax)에러의 경우
            크롬 콘솔창에서 확인가능합니다. 에러가 아닌 경우, 디버깅을 하실 수 있습니다. 성공하신
            경우 마지막 테스트케이스로 디버깅 가능하며, 실패하신 경우 틀리신 테스트케이스로 디버깅이
            가능합니다. 심화문제의 경우, 인터프리터 성능상 디버깅은 어려우나, 시각화된 움직임을 보실
            수 있습니다. 추후 업데이트 해나가도록 하겠습니다.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
