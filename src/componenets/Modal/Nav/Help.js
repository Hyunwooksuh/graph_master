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
      <h2 className="help">๐ค ๋์๋ง ๐ค</h2>
      <div className="help-explain">
        <div>
          <div>๐โโ๏ธ ํธ๋ฆฌ๋ฌธ์  ๋ธ๋๊ตฌ์กฐ</div>
          <p className="help-details">
            ํธ๋ฆฌ๋ฌธ์ ์ ๋ธ๋ ๊ตฌ์กฐ์ ๊ฒฝ์ฐ, ๋ฌธ์ ์๋ ์ถ์๋ ํํ๋ก [1, 2, 3]๊ณผ ๊ฐ์ด ์ ์๋์ด์์ง๋ง,
            ์ค์ ๋ก๋ TreeNode๊ตฌ์กฐ์ ๋ฐ๋ผ Nested๋ ํํ๋ฅผ ๋๊ณ  ์์ต๋๋ค. ์๋ฅผ ๋ค๋ฉด, ์ฒซ๋ฒ์งธ ๋ธ๋์
            ๊ฒฝ์ฐ value๊ฐ 1์ด๊ณ  left๋ 2๋ฅผ value๋ก ๊ฐ์ง๋ child ๋ธ๋์ด๋ฉฐ, right์ ๊ฒฝ์ฐ์๋ 3์
            value๋ก ๊ฐ์ง๋ child ๋ธ๋๋ก ๋ณด์๋ฉด ๋ฉ๋๋ค.
          </p>
        </div>
        <div>
          <div>๐โโ๏ธ ๋ฌธ์ ํ์ด</div>
          <p className="help-details">
            ๊ทธ๋ํ ์ํ๋ฅผ ๊ฑฐ์น์๋ฉด์ ์ ์๋ OUTPUT ๋ฐฐ์ด์ value๋ฅผ pushํ์๊ณ  ์ ์ถํ์๋ฉด ๋ฉ๋๋ค.
            ์ฌํ๋ฌธ์ ์ ๊ฒฝ์ฐ, visited nodes์๋ ์๋ ฅ ๋ถํ๋๋ฆฝ๋๋ค.
          </p>
        </div>
        <div>
          <div>๐โโ๏ธ ์ถ๊ฐ ๋ฉ์๋</div>
          <p className="help-details">
            isObjEqual ๊ณผ includes ๋ฉ์๋์ ๊ฒฝ์ฐ, ์ถ๊ฐ ์ง์๋ฉ๋๋ค. isObjEqual์ ๊ฒฝ์ฐ
            isObjEqual(Object, Object)๊ณผ ๊ฐ์ด ์ฌ์ฉ๊ฐ๋ฅํ๋ฉฐ, ๋ ๊ฐ์ฒด๋ฅผ ๊น์ ์์ค์์ ๋น๊ตํ์ฌ Boolean
            ๊ฐ์ ๋ฐํํฉ๋๋ค. includes๋ includes(Array, AnyTypeObject)๊ณผ ๊ฐ์ด ์ฌ์ฉ ๊ฐ๋ฅํ๋ฉฐ, ๋ชจ๋ 
            ํํ์ ๊ฐ์ฒด์ ๋ํด์ ํด๋น ๋ฐฐ์ด์ ํฌํจ๋์๋ ์ง ์ฌ๋ถ๋ฅผ ํ๋จํ์ฌ, Boolean๊ฐ์ ๋ฐํํฉ๋๋ค.
          </p>
        </div>
        <div>
          <div>๐โโ๏ธ ๋๋ฒ๊น</div>
          <p className="help-details">
            ๋ฌดํ๋ฃจํ์ ๊ฐ์ ๋ฐํ์ ์๋ฌ์ ๊ฒฝ์ฐ ํ์์ฐฝ์์ ํ์ธ ๊ฐ๋ฅํ๋ฉฐ, ๊ตฌ๋ฌธ(Syntax)์๋ฌ์ ๊ฒฝ์ฐ
            ํฌ๋กฌ ์ฝ์์ฐฝ์์ ํ์ธ๊ฐ๋ฅํฉ๋๋ค. ์๋ฌ๊ฐ ์๋ ๊ฒฝ์ฐ, ๋๋ฒ๊น์ ํ์ค ์ ์์ต๋๋ค. ์ฑ๊ณตํ์ 
            ๊ฒฝ์ฐ ๋ง์ง๋ง ํ์คํธ์ผ์ด์ค๋ก ๋๋ฒ๊น ๊ฐ๋ฅํ๋ฉฐ, ์คํจํ์  ๊ฒฝ์ฐ ํ๋ฆฌ์  ํ์คํธ์ผ์ด์ค๋ก ๋๋ฒ๊น์ด
            ๊ฐ๋ฅํฉ๋๋ค. ์ฌํ๋ฌธ์ ์ ๊ฒฝ์ฐ, ์ธํฐํ๋ฆฌํฐ ์ฑ๋ฅ์ ๋๋ฒ๊น์ ์ด๋ ค์ฐ๋, ์๊ฐํ๋ ์์ง์์ ๋ณด์ค
            ์ ์์ต๋๋ค. ์ถํ ์๋ฐ์ดํธ ํด๋๊ฐ๋๋ก ํ๊ฒ ์ต๋๋ค.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
