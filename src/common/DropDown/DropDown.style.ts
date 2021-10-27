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
  box-shadow: 0 0.5rem 0.875rem 0.125rem rgba(50, 50, 50, 0.1);
`

export const OptionButton = styled(Button)`
  justify-content: flex-end;
  width: 100%;
  background: none;
  border-radius: 0.25rem;

  &:hover,
  &:focus {
    background: var(--color-blue-100);
  }

  &:active {
    color: var(--color-blue-400);
    background: var(--color-blue-200);
  }
`
