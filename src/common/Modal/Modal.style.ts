import styled from 'styled-components'

export type variant = 'error'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`

export const StyledModal = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: fill-available;
  max-width: 26rem;
  padding: 2rem;
  margin: 1.5rem;
  overflow: hidden;
  text-align: center;
  background: var(--color-gray-100);
  border-radius: 1rem;
`

interface TitleProps {
  variant?: variant
}

export const Title = styled.h2<TitleProps>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${p => p.variant === 'error' && 'var(--color-red-600);'};
`
