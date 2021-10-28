import styled, { css } from 'styled-components'

import Button from '../common/Button'
import Switch from '../common/Switch'

export const Section = styled.section`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;
  align-content: flex-start;
  margin: 0 1.5rem 1.5rem;
`

interface ControlGridProps {
  rows: number
  cols: number
}

export const ControlsGrid = styled.div<ControlGridProps>`
  display: grid;
  grid-template: ${p => `repeat(${p.rows}, 1fr) / repeat(${p.cols}, 1fr) `};
  gap: 0.25rem;

  & > *:first-child {
    border-top-left-radius: 0.5rem;
  }

  & > *:last-child {
    border-bottom-right-radius: 0.5rem;
  }

  & > *:nth-child(${p => p.cols}) {
    border-top-right-radius: 0.5rem;
  }

  & > *:nth-last-child(${p => p.cols}) {
    border-bottom-left-radius: 0.5rem;
  }
`

const numpadColors = css`
  /* stylelint-ignore */
  --color: var(--color-green-400);
  --background: var(--color-green-100);
  --background-hover: var(--color-green-200);
  --background-active: var(--color-green-400);

  &[aria-pressed='true'] {
    --color: var(--color-gray-100);
    --background: var(--color-green-400);
    --background-hover: var(--color-green-500);
    --background-active: var(--color-green-600);
  }
`

interface ControlProps {
  numpad?: boolean
}

const controlStyles = css<ControlProps>`
  ${({ numpad }) => numpad && numpadColors}

  aspect-ratio: 1;
  font-size: 1.5rem;
  border-radius: 0.125rem;
`

export const ControlButton = styled(Button)<ControlProps>`
  ${controlStyles}
`
export const ControlSwitch = styled(Switch)<ControlProps>`
  ${controlStyles}
`
