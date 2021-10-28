import styled from 'styled-components'

export default styled.button`
  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  place-items: center;
  min-height: 32px;
  padding: 0 0.75rem;
  font-weight: 600;
  color: var(--color);
  text-transform: capitalize;
  user-select: none;
  background: var(--background);
  border-radius: 0.5rem;
  outline-color: var(--color);
  transition: 100ms ease-out;
  transition-property: background color;

  &:hover,
  &:focus-visible {
    background: var(--background-hover);
  }

  &:active {
    color: var(--color-active);
    background: var(--background-active);
  }

  --color: var(--color-blue-400);
  --color-active: var(--color-gray-100);
  --background: var(--color-blue-100);
  --background-hover: var(--color-blue-200);
  --background-active: var(--color-blue-400);
`
