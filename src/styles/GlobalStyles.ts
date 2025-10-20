import { createGlobalStyle } from 'styled-components';
import { colors, font } from '@/lib/constants';

const GlobalStyles = createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    font-size: ${font.size.medium};
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: ${colors.black};
    background-color: ${colors.lightGrey};
  }


  button, input, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
  }


  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }


  a {
    -webkit-tap-highlight-color: transparent;
  }

  button, [role='button'] {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }


  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }


  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }
`;

export default GlobalStyles;
