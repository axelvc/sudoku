import styled from 'styled-components'

import Button from './Button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface Props extends Omit<ButtonProps, 'aria-pressed'> {
  pressed: boolean
}

const StyledSwitch = styled(Button).attrs<Props>(({ pressed }) => ({
  'aria-pressed': pressed,
}))<Props>`
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
