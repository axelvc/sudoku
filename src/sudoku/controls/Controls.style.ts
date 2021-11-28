import styled, { css } from 'styled-components'
import { breakpoints, fancyBox, roundedGrid } from '../../styles/utils'

import Button from '../../common/Button'
import Switch from '../../common/Switch'

export const Section = styled.section`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;
  align-content: flex-start;
  margin: 0 1.5rem 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    grid-template: auto / auto;
    place-items: center;
    margin: 0;
  }
`

export const ControlsContainer = styled.div`
  @media (min-width: ${breakpoints.md}) {
    ${fancyBox};
  }
`

export const UtilsControls = styled.div`
  ${roundedGrid(3, 2)};

  @media (min-width: ${breakpoints.md}) {
    ${roundedGrid(2, 3)};
  }
`

export const NumpadControls = styled.div`
  ${roundedGrid(3, 3)};
`

const controlStyles = css`
  aspect-ratio: 1;
  font-size: 1.5rem;
  border-radius: 0.125rem;

  @media (min-width: ${breakpoints.md}) {
    width: 3rem;
  }
`

export const ControlButton = styled(Button)`
  ${controlStyles}
`

export const ControlSwitch = styled(Switch)`
  ${controlStyles}
`

interface ControlSwitchProps {
  numpad?: boolean
}

export const NumpadSwitch = styled(Switch)<ControlSwitchProps>`
  ${controlStyles}

  &[aria-pressed='true'] {
    --color: var(--color-gray-100);
    --background: var(--color-green-400);
    --background-hover: var(--color-green-500);
    --background-active: var(--color-green-600);
  }

  --color: var(--color-green-400);
  --background: var(--color-green-100);
  --background-hover: var(--color-green-200);
  --background-active: var(--color-green-400);
`
