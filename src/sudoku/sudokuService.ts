export type Sudoku = number[][]

export interface ResponseType {
  puzzle: Sudoku
  solution: Sudoku
}

const API = 'https://sugoku.herokuapp.com'

export const difficulties = ['easy', 'medium', 'hard']

async function getSudoku(difficulty: string): Promise<Sudoku> {
  const res = await fetch(`${API}/board?difficulty=${difficulty}`)
  const { board } = await res.json()

  return board
}

async function getSolution(puzzle: Sudoku): Promise<Sudoku> {
  const opts = {
    method: 'POST',
    body: new URLSearchParams({ board: JSON.stringify(puzzle) }),
  }

  const res = await fetch(`${API}/solve`, opts)
  const { solution } = await res.json()

  return solution
}

export async function fetchSudoku(difficulty: string): Promise<ResponseType> {
  const puzzle = await getSudoku(difficulty)
  const solution = await getSolution(puzzle)

  return { puzzle, solution }
}
