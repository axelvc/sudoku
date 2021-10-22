import { FC } from 'react'

interface Props {
  options: string[]
  selected: string
  onChange?: (newValue: string) => void
}

const DropDown: FC<Props> = ({ options, selected, onChange }) => (
  <select value={selected} onChange={ev => onChange?.(ev.target.value)}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export default DropDown
