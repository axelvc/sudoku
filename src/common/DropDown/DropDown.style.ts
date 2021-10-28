import styled from 'styled-components'

import Button from '../Button'

export { Button }

export const DropDownContainer = styled.div`
  position: relative;
`

export const Ul = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  display: grid;
  gap: 0.25rem;
  padding: 0.25rem;
  margin-top: 0.25rem;
  background: var(--color-gray-100);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 0.75rem 0.25rem rgba(50, 50, 50, 0.2);
`

export const SelectedButton = styled(Button)`
  svg {
    transition: transform 0.2s ease-in-out;
  }

  &[aria-expanded='true'] {
    svg {
      transform: rotate(180deg);
    }
  }
`

export const OptionButton = styled(Button)`
  justify-content: flex-end;
  width: 100%;
  background: none;
  border-radius: 0.25rem;

  &:focus {
    background: var(--background-hover);
  }

  --color-active: var(--color-blue-400);
  --background-hover: var(--color-blue-100);
  --background-active: var(--color-blue-200);
`
