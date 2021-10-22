import { FC } from 'react'

import Switch from '../common/Switch'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFillValue, setMarksEnabled } from './controlsSlice'

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
    <section>
      <div>
        <Switch
          pressed={marksEnabled}
          onClick={() => dispatch(setMarksEnabled(!marksEnabled))}
        >
          marks
        </Switch>
        <Switch pressed={fillValue === 0} onClick={() => updateFillValue(0)}>
          erase
        </Switch>
        {/* TODO: add actions to these buttons */}
        <button>help</button>
        <button>validate</button>
        <button>undo</button>
        <button>reset</button>
      </div>

      <div>
        {NUMPAD_NUMBERS.map(n => (
          <Switch key={n} pressed={fillValue === n} onClick={() => updateFillValue(n)}>
            {n}
          </Switch>
        ))}
      </div>
    </section>
  )
}

export default Controls
