import { FC, useEffect, useRef, useState } from 'react'

import { Button, DropDownContainer, OptionButton, Ul } from './DropDown.style'

interface Props {
  options: string[]
  selected: string
  onChange?: (newValue: string) => void
}

const DropDown: FC<Props> = ({ options, selected, onChange }) => {
  const [visible, setVisible] = useState(false)
  const list = useRef<HTMLUListElement>(null)

  function handleClickOption(option: string): void {
    onChange?.(option)
    setVisible(false)
  }

  // hidden on click outside
  useEffect(() => {
    if (!visible) return

    function closeListOnClickOutside(ev: MouseEvent | FocusEvent): void {
      if (list.current && !list.current.contains(ev.target as Node)) {
        setVisible(false)
      }
    }

    document.addEventListener('click', closeListOnClickOutside)
    return () => document.removeEventListener('click', closeListOnClickOutside)
  }, [visible, list])

  return (
    <DropDownContainer>
      <Button role="combobox" aria-expanded={visible} onClick={() => setVisible(true)}>
        {selected}
      </Button>
      {visible && (
        <Ul role="listbox" ref={list}>
          {options.map(option => (
            <li key={option}>
              <OptionButton
                key={option}
                role="option"
                onClick={() => handleClickOption(option)}
                autoFocus={option === selected}
              >
                {option}
              </OptionButton>
            </li>
          ))}
        </Ul>
      )}
    </DropDownContainer>
  )
}

export default DropDown
