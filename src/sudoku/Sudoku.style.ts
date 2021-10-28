import styled from 'styled-components'

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

export const Box = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  font-weight: 700;
  color: var(--color-fg);
  background: var(--color-gray-200);
  border-radius: 0.2rem;
`
export const BoxValue = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const BoxMarks = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template:
    'n1 n2 n3' 1fr
    'n4 n5 n6' 1fr
    'n7 n8 n9' 1fr / 1fr 1fr 1fr;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 10%;
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
