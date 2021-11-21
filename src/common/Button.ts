import styled from 'styled-components'

type size = 'normal' | 'large'

interface ButtonProps {
  size?: size
}

const sizes: Record<size, string> = {
  normal: '2rem',
  large: '2.5rem',
}

export default styled.button<ButtonProps>`
  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  place-items: center;
  min-height: ${p => sizes[p.size ?? 'normal']};
  padding: 0 0.75rem;
  font-weight: 600;
  color: var(--color);
  text-transform: capitalize;
  user-select: none;
  background: var(--background);
  border-radius: 0.5rem;
  outline-color: var(--color);
  transition: 100ms ease-out;
  transition-property: background, color;

  &:hover,
  &:focus-visible {
    color: var(--color-hover);
    background: var(--background-hover);
  }

  &:active {
    color: var(--color-active);
    background: var(--background-active);
  }

  --color: var(--color-blue-400);
  --color-hover: var(--color);
  --color-active: var(--color-gray-100);
  --background: var(--color-blue-100);
  --background-hover: var(--color-blue-200);
  --background-active: var(--color-blue-400);
`
