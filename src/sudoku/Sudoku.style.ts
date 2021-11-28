import styled, { css, keyframes } from 'styled-components'
import { breakpoints, fancyBox, roundedGrid } from '../styles/utils'

import Switch from '../common/Switch'

export const SudokuContainer = styled.div`
  @media (min-width: ${breakpoints.md}) {
    ${fancyBox};

    display: grid;
    gap: 0.75rem;
  }
`

export const SudokuHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0.75rem;

  @media (min-width: ${breakpoints.md}) {
    margin: 0;
  }
`

export const SudokuGrid = styled.div`
  ${roundedGrid(9, 9)};

  margin: 0.5rem;

  @media (min-width: ${breakpoints.md}) {
    margin: 0;
  }
`

export const SuccessDifficulty = styled.p`
  font-size: 0.875rem;
  color: var(--color-gray-600);
  text-transform: capitalize;
`

export const TimerIcon = styled.span`
  display: flex;
  height: 1rem;
`

interface BoxProps {
  isLoading: boolean
  blockIndex: number
  hasMarks: boolean
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
  padding: 0;
  font-weight: 700;
  border-radius: 0.2rem;

  --color: var(--color-gray-900);
  --color-active: var(--color-gray-900);
  --background: var(--color-gray-200);
  --background-hover: var(--color-gray-300);
  --background-active: var(--color-gray-400);
  --disabled-line: var(--color-gray-300);

  @media (min-width: ${breakpoints.md}) {
    width: 2.5rem;
  }

  ${p =>
    p.isLoading
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

            --color: var(--color-gray-600);
          }
        `}

  &[aria-pressed='true'] {
    --color: var(--color-green-400);
    --color-active: var(--color-gray-100);
    --background: var(--color-green-100);
    --background-hover: var(--color-green-200);
    --background-active: var(--color-green-400);
    --disabled-line: var(--color-green-200);
  }

  &[aria-invalid='true'] {
    --color: var(--color-red-500);
    --color-active: var(--color-gray-100);
    --background: var(--color-red-100);
    --background-hover: var(--color-red-300);
    --background-active: var(--color-red-500);
    --disabled-line: var(--color-red-300);
  }

  ${p =>
    p.blockIndex % 2 === 0 &&
    css`
      /* stylelint-disable-next-line custom-property-empty-line-before */
      --background: var(--color-gray-300);
      --background-hover: var(--color-gray-400);
      --background-active: var(--color-gray-500);
      --disabled-line: var(--color-gray-500);
    `}

  ${p =>
    p.hasMarks &&
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
