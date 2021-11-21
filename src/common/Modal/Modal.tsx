import { FC } from 'react'
import { createPortal } from 'react-dom'

import { Container, StyledModal, Title, variant } from './Modal.style'

interface Props {
  title: string
  variant?: variant
}

const Modal: FC<Props> = ({ title, children, variant }) => {
  return createPortal(
    <Container data-testid="modal-container">
      <StyledModal data-testid="modal">
        <Title variant={variant}>{title}</Title>
        {children}
      </StyledModal>
    </Container>,
    document.body,
  )
}

export default Modal
