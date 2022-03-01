import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Mono', 'IBM Plex Sans KR', Menlo, 'Courier New';
    margin: 0;
    padding: 0;
    background: #87cefa;

    #root {
      height: 100vh;
    }
  }
  li {
    list-style: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;
