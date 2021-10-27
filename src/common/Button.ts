import styled from 'styled-components'

export default styled.button`
  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  place-items: center;
  min-height: 32px;
  padding: 0 0.75rem;
  font-weight: 600;
  color: var(--color-blue-400);
  text-transform: capitalize;
  user-select: none;
  background: var(--color-blue-100);
  border-radius: 0.5rem;
  outline-color: var(--color-blue-400);
  transition: 100ms ease-out;
  transition-property: background color;

  &:hover,
  &:focus {
    background: var(--color-blue-200);
  }

  &:active {
    color: var(--color-gray-100);
    background: var(--color-blue-400);
  }
`
