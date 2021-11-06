import styled from 'styled-components'

interface Props {
  rows: number
  cols: number
}

export default styled.div<Props>`
  display: grid;
  grid-template: ${p => `repeat(${p.rows}, 1fr) / repeat(${p.cols}, 1fr) `};
  gap: 0.25rem;

  & > *:first-child {
    border-top-left-radius: 0.5rem;
  }

  & > *:last-child {
    border-bottom-right-radius: 0.5rem;
  }

  & > *:nth-child(${p => p.cols}) {
    border-top-right-radius: 0.5rem;
  }

  & > *:nth-last-child(${p => p.cols}) {
    border-bottom-left-radius: 0.5rem;
  }
`
