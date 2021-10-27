import { FC } from 'react'

import { Button, DropDownContainer, OptionButton, Ul } from './DropDown.style'

interface Props {
  options: string[]
  selected: string
  onChange?: (newValue: string) => void
}

const DropDown: FC<Props> = ({ options, selected, onChange }) => (
  <DropDownContainer>
    <Button>{selected}</Button>
    <Ul>
      {options.map(option => (
        <li key={option}>
          <OptionButton key={option} onClick={() => onChange?.(option)}>
            {option}
          </OptionButton>
        </li>
      ))}
    </Ul>
  </DropDownContainer>
)

export default DropDown
