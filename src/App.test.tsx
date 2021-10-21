import { render, screen } from '@testing-library/react'
import App from './App'

describe('sample test', () => {
  it('should print "hello world"', () => {
    render(<App />)

    expect(screen.queryByText(/hello world/i)).toBeInTheDocument()
  })
})
