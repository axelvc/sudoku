import styled, { css } from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0.75rem;
`

export const TimerIconContainer = styled.span`
  display: flex;
  height: 1rem;
`

export const SudokuGrid = styled.div`
  display: grid;
  grid-template: repeat(9, 1fr) / repeat(9, 1fr);
  gap: 0.25rem;
  margin: 0.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
`

interface BoxProps {
  hasMarks: boolean
}

export const Box = styled.button<BoxProps>`
  position: relative;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: var(--color-fg);
  background: var(--color-gray-200);
  border-radius: 0.2rem;

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
