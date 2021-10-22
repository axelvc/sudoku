import { FC } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface Props extends Omit<ButtonProps, 'aria-pressed'> {
  pressed: boolean
}

const Switch: FC<Props> = ({ children, pressed, ...props }) => {
  return (
    <button {...props} aria-pressed={pressed}>
      {children}
    </button>
  )
}

export default Switch
