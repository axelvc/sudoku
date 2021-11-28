import { css } from 'styled-components'

export const breakpoints = {
  md: '768px',
}

export const roundedGrid = (rows: number, cols: number): ReturnType<typeof css> => css`
  display: grid;
  grid-template: ${p => `repeat(${rows}, 1fr) / repeat(${cols}, 1fr) `};
  gap: 0.25rem;
  overflow: hidden;
  border-radius: 0.5rem;
`

export const fancyBox = css`
  padding: 1.5rem;
  background: var(--color-gray-100);
  border-radius: 1rem;
`
