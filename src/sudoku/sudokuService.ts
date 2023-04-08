import sudoku from 'sudoku'

export type Sudoku = number[][]

export interface ResponseType {
  puzzle: Sudoku
  solution: Sudoku
}

export const difficulties = ['easy', 'medium', 'hard']

function makeChunks<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }

  return chunks
}

async function getSudoku(_difficulty: string): Promise<Sudoku> {
  const puzzle = sudoku.makepuzzle()

  console.log(sudoku.ratepuzzle(puzzle, 4))

  return makeChunks(puzzle, 9)
}

async function getSolution(puzzle: Sudoku): Promise<Sudoku> {
  const solution = sudoku.solvepuzzle(puzzle.flat())
  return makeChunks(solution, 9)
}

export async function fetchSudoku(difficulty: string): Promise<ResponseType> {
  const puzzle = await getSudoku(difficulty)
  const solution = await getSolution(puzzle)

  return { puzzle, solution }
}
