import { regex, render, screen } from '../../test/utils'

import Modal from './Modal'

describe('Modal component', () => {
  it('should render correct title and details', () => {
    const title = 'A sample title to test'
    const details =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, illum.'

    render(
      <Modal title={title}>
        <p>{details}</p>
        <button>ok</button>
      </Modal>,
    )

    const $modal = screen.getByTestId('modal-container')

    expect($modal).toHaveTextContent(regex(title))
    expect($modal).toHaveTextContent(regex(details))
    expect($modal).toContainHTML('<button>ok</button>')
  })

  it('should have same styles', () => {
    render(<Modal title="" />)

    const $modal = screen.getByTestId('modal-container')

    expect($modal).toMatchSnapshot()
  })

  it('should have error title styles', () => {
    render(<Modal title="" variant="error" />)

    const $modal = screen.getByTestId('modal-container')

    expect($modal).toMatchSnapshot()
  })
})
