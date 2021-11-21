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

    expect($modal).toMatchInlineSnapshot(`
.c0 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
}

.c1 {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 2rem;
  max-width: 26rem;
  padding: 2rem;
  margin: 1.5rem;
  overflow: hidden;
  text-align: center;
  background: var(--color-gray-100);
  border-radius: 1rem;
}

.c2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-red-600);
}

<div
  class="c0"
  data-testid="modal-container"
>
  <section
    class="c1"
    data-testid="modal"
  >
    <h2
      class="c2"
    />
  </section>
</div>
`)
  })
})
