import { createGlobalStyle } from 'styled-components'

/*
    createGlobalStyles replaces index.css.
    It's more flexible and consistent with our usage of styled components.
    Learn more about it here: https://www.styled-components.com/docs/api#createglobalstyle
*/

export default createGlobalStyle`
 body {
      margin: 0;
      padding: 0;
      height: 100vh;
  }
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
     min-height: 100vh;
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.theme.primaryTextColor};
    background-color: ${(props) => props.theme.bodyBackgroundColor};   
    font-size: 12px;
}
  *{
      box-sizing: border-box;
  }
  code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
  }
`
