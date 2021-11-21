import styled, { css, keyframes } from 'styled-components'
import Switch from '../common/Switch'
import Grid from '../common/Grid'

export const SudokuHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0.75rem;
`

export const SudokuGrid = styled(Grid)`
  margin: 0.5rem;
`

interface BoxProps {
  isLoading: boolean
  blockIndex: number
  hasMarks: boolean
  error: boolean
}

const loadingBoxAnimation = keyframes`
  0% { background-position-x: 0 }
  30% { background-position-x: 100% }
  100% { background-position-x: 100% }
`

export const Box = styled(Switch)<BoxProps>`
  position: relative;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-weight: 700;
  border-radius: 0.2rem;

  --color: var(--color-gray-900);
  --color-active: var(--color-gray-900);
  --background: var(--color-gray-200);
  --background-hover: var(--color-gray-300);
  --background-active: var(--color-gray-400);
  --disabled-line: var(--color-gray-300);

  ${({ isLoading }) =>
    isLoading
      ? css`
          background-image: linear-gradient(
            to right,
            transparent 33%,
            rgba(0, 0, 0, 0.1),
            transparent 66%
          );
          background-size: 300%;
          animation: ${loadingBoxAnimation} 2.5s ease-in-out infinite;
        `
      : css`
          &:disabled {
            background-image: linear-gradient(
              -45deg,
              var(--background) 15%,
              var(--disabled-line) 15% 25%,
              var(--background) 25% 35%,
              var(--disabled-line) 35% 45%,
              var(--background) 45% 55%,
              var(--disabled-line) 55% 65%,
              var(--background) 65% 75%,
              var(--disabled-line) 75% 85%,
              var(--background) 85%
            );
          }
        `}

  &[aria-pressed='true'] {
    --color: var(--color-green-400);
    --background: var(--color-green-100);
    --background-hover: var(--color-green-200);
    --color-active: var(--color-gray-100);
    --background-active: var(--color-green-400);
    --disabled-line: var(--color-green-200);
  }

  ${({ blockIndex }) =>
    Boolean(blockIndex % 2) &&
    css`
      /* stylelint-ignore */
      --background: var(--color-gray-300);
      --background-hover: var(--color-gray-400);
      --background-active: var(--color-gray-500);
      --disabled-line: var(--color-gray-500);
    `}

  ${({ error }) =>
    error &&
    css`
      /* stylelint-ignore */
      --color: var(--color-red-500);
      --background: var(--color-red-100);
      --background-hover: var(--color-red-300);
      --color-active: var(--color-gray-100);
      --background-active: var(--color-red-500);
      --disabled-line: var(--color-red-300);
    `}

  ${({ hasMarks }) =>
    hasMarks &&
    css`
      grid-template:
        'n1 n2 n3' 1fr
        'n4 n5 n6' 1fr
        'n7 n8 n9' 1fr / 1fr 1fr 1fr;
      padding: 10%;
    `}
`

interface MarkProps {
  mark: number
}

export const Mark = styled.span<MarkProps>`
  grid-area: ${({ mark }) => `n${mark}`};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 0;
  color: var(--color-gray-600);
`
