import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --color-gray-100: #f8f9fa;
    --color-gray-200: #e9ecef;
    --color-gray-300: #d3d9de;
    --color-gray-400: #c8cfd5;
    --color-gray-500: #b3bac2;
    --color-gray-600: #6c757d;
    --color-gray-900: #121417;
    --color-gray-blue-100: #dbecff;
    --color-gray-blue-200: #c2dbff;
    --color-gray-blue-400: #558ce2;
    --color-gray-blue-500: #2f71da;
    --color-green-50: #dbf0e4;
    --color-green-100: #b9dfc9;
    --color-green-300: #8fbca8;
    --color-green-400: #76ad96;
    --color-green-500: #528972;
    --color-red-100: #ffc3c3;
    --color-red-300: #fa9ea0;
    --color-red-500: #da2f35;
    --color-yellow-100: #fcddb6;
    --color-yellow-500: #e2a427;
  }

  * {
    padding: 0;
    margin: 0;
    font: unset;
  }

  body {
    font: 500 1rem 'Poppins', sans-serif;
    color: var(--color-gray-900);
    letter-spacing: 0.03rem;
    background: var(---color-gray-100);
  }

  main {
    display: grid;
    gap: 1.5rem;
  }

  button {
    color: unset;
    cursor: pointer;
    background: none;
    border: none;
  }
`