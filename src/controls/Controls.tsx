import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFillValue, setMarksEnabled } from './controlsSlice'
import { helpFill, reset, undo, validateSudoku } from '../sudoku/sudokuSlice'

import Grid from '../common/Grid'
import Pencil from '../common/svg/Pencil.svg'
import Eraser from '../common/svg/Eraser.svg'
import Bulb from '../common/svg/Bulb.svg'
import Check from '../common/svg/Check.svg'
import Undo from '../common/svg/Undo.svg'
import Reset from '../common/svg/Reset.svg'
import { ControlButton, ControlSwitch, Section } from './Controls.style'

const NUMPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Controls: FC = () => {
  const dispatch = useAppDispatch()
  const marksEnabled = useAppSelector(state => state.controls.marksEnabled)
  const fillValue = useAppSelector(state => state.controls.fillValue)

  function updateFillValue(value: number): void {
    const newFillValue = fillValue === value ? null : value

    dispatch(setFillValue(newFillValue))
  }

  return (
    <Section>
      <Grid cols={2} rows={3}>
        <ControlSwitch
          title="marks"
          pressed={marksEnabled}
          onClick={() => dispatch(setMarksEnabled(!marksEnabled))}
        >
          <Pencil />
        </ControlSwitch>
        <ControlSwitch
          title="erase"
          pressed={fillValue === 0}
          onClick={() => updateFillValue(0)}
        >
          <Eraser />
        </ControlSwitch>
        <ControlButton title="help" onClick={() => dispatch(helpFill())}>
          <Bulb />
        </ControlButton>
        <ControlButton title="validate" onClick={() => dispatch(validateSudoku())}>
          <Check />
        </ControlButton>
        <ControlButton title="undo" onClick={() => dispatch(undo())}>
          <Undo />
        </ControlButton>
        <ControlButton title="reset" onClick={() => dispatch(reset())}>
          <Reset />
        </ControlButton>
      </Grid>

      <Grid cols={3} rows={3}>
        {NUMPAD_NUMBERS.map(n => (
          <ControlSwitch
            numpad
            key={n}
            data-testid={`numpad-${n}`}
            pressed={fillValue === n}
            onClick={() => updateFillValue(n)}
          >
            {n}
          </ControlSwitch>
        ))}
      </Grid>
    </Section>
  )
}

export default Controls
