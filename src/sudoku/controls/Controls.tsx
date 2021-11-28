import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  helpFill,
  reset,
  undo,
  validate,
  setMarksEnabled,
  UpdateNumpadValueOrFillBox,
} from '../sudokuSlice'

import Pencil from '../../common/svg/Pencil.svg'
import Eraser from '../../common/svg/Eraser.svg'
import Bulb from '../../common/svg/Bulb.svg'
import Check from '../../common/svg/Check.svg'
import Undo from '../../common/svg/Undo.svg'
import Reset from '../../common/svg/Reset.svg'
import {
  ControlButton,
  ControlSwitch,
  ControlsContainer,
  NumpadControls,
  NumpadSwitch,
  Section,
  UtilsControls,
} from './Controls.style'

const NUMPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Controls: FC = () => {
  const numpadValue = useAppSelector(state => state.numpadValue)
  const marksEnabled = useAppSelector(state => state.marksEnabled)
  const dispatch = useAppDispatch()

  return (
    <Section>
      <ControlsContainer>
        <UtilsControls>
          <ControlSwitch
            title="marks"
            pressed={marksEnabled}
            onClick={() => dispatch(setMarksEnabled(!marksEnabled))}
          >
            <Pencil />
          </ControlSwitch>
          <ControlSwitch
            title="erase"
            pressed={numpadValue === 0}
            onClick={() => dispatch(UpdateNumpadValueOrFillBox(0))}
          >
            <Eraser />
          </ControlSwitch>
          <ControlButton title="help" onClick={() => dispatch(helpFill())}>
            <Bulb />
          </ControlButton>
          <ControlButton title="validate" onClick={() => dispatch(validate())}>
            <Check />
          </ControlButton>
          <ControlButton title="undo" onClick={() => dispatch(undo())}>
            <Undo />
          </ControlButton>
          <ControlButton title="reset" onClick={() => dispatch(reset())}>
            <Reset />
          </ControlButton>
        </UtilsControls>
      </ControlsContainer>

      <ControlsContainer>
        <NumpadControls>
          {NUMPAD_NUMBERS.map(n => (
            <NumpadSwitch
              key={n}
              data-testid={`numpad-${n}`}
              pressed={numpadValue === n}
              onClick={() => dispatch(UpdateNumpadValueOrFillBox(n))}
            >
              {n}
            </NumpadSwitch>
          ))}
        </NumpadControls>
      </ControlsContainer>
    </Section>
  )
}

export default Controls
