import styled from 'styled-components'

import Button from './Button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface Props extends Omit<ButtonProps, 'aria-pressed'> {
  pressed: boolean
}

const StyledSwitch = styled(Button).attrs<Props>(({ pressed }) => ({
  'aria-pressed': pressed,
}))<Props>`
  color: var(--color);
  background: var(--background);
  outline-color: var(--color);

  --color: var(--color-blue-500);
  --color-active: var(--color-gray-100);
  --background: var(--color-blue-100);
  --background-hover: var(--color-blue-200);
  --background-active: var(--color-blue-400);

  &:hover,
  &:focus {
    color: var(--color);
    background: var(--background-hover);
  }

  &:active {
    color: var(--color-active);
    background: var(--background-active);
  }

  &[aria-pressed='true'] {
    --color: var(--color-gray-100);
    --background: var(--color-blue-400);
    --background-hover: var(--color-blue-500);
    --background-active: var(--color-blue-600);

    &:focus {
      outline-color: var(--color-gray-900);
    }
  }
`

export default StyledSwitch
