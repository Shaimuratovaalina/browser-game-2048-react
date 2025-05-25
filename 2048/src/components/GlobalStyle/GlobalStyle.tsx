import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  body {
    font-family: 'Satisfy', cursive;
    font-size: 18px;
    overflow: hidden;
    overscroll-behavior: none;
  }
  #game {
    width: 100vw;
    height: 100vh;
  }
`;

export default GlobalStyle;