import { FC, useEffect, useRef, useState } from 'react'

import { DropDownContainer, OptionButton, SelectedButton, Ul } from './DropDown.style'
import CaretDown from '../svg/CaretDown.svg'

interface Props {
  options: string[]
  selected: string
  onChange?: (newValue: string) => void
}

const DropDown: FC<Props> = ({ options, selected, onChange }) => {
  const [visible, setVisible] = useState(false)
  const optionList = useRef<HTMLUListElement>(null)
  const optionItem = useRef<HTMLButtonElement[]>([])

  // hide menu on click outside
  useEffect(() => {
    if (!visible) return

    function closeListOnClickOutside(ev: MouseEvent | FocusEvent): void {
      if (optionList.current && !optionList.current.contains(ev.target as Node)) {
        setVisible(false)
      }
    }

    document.addEventListener('click', closeListOnClickOutside)
    return () => document.removeEventListener('click', closeListOnClickOutside)
  }, [visible, optionList])

  function closeListByKeyboard(key: string): void {
    if (!visible) return

    if (key === 'Escape' || key === 'Tab') {
      setVisible(false)
    }
  }

  function arrowKeyNavigate(ev: React.KeyboardEvent<HTMLButtonElement>, i: number): void {
    const $items = optionItem.current

    if (ev.key === 'ArrowUp') {
      ev.preventDefault()

      $items.at(i - 1)?.focus()
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault()

      $items.at((i + 1) % $items.length)?.focus()
    }
  }

  return (
    <DropDownContainer onKeyDown={ev => closeListByKeyboard(ev.key)}>
      <SelectedButton
        role="combobox"
        aria-expanded={visible}
        onClick={() => setVisible(true)}
      >
        {selected}
        <CaretDown />
      </SelectedButton>
      {visible && (
        <Ul
          role="listbox"
          ref={optionList}
          onMouseOver={ev => (ev.target as HTMLElement).focus()}
        >
          {options.map((option, i) => (
            <li key={option}>
              <OptionButton
                key={option}
                role="option"
                tabIndex={-1}
                autoFocus={option === selected}
                ref={el => {
                  if (el) optionItem.current[i] = el
                }}
                onClick={() => {
                  onChange?.(option)
                  setVisible(false)
                }}
                onKeyDown={ev => arrowKeyNavigate(ev, i)}
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
