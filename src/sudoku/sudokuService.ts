export type Sudoku = number[][]

export interface ResponseType {
  puzzle: Sudoku
  solution: Sudoku
}

export const difficulties = ['easy', 'medium', 'hard']

// TODO: implement real api
export async function fetchSudoku(difficulty: string): Promise<ResponseType> {
  return await new Promise((resolve, reject) =>
    setTimeout(
      // () => reject(new Error('Not allowed')),
      () =>
        resolve({
          puzzle: [
            [7, 0, 0, 9, 1, 0, 0, 5, 6],
            [0, 2, 0, 0, 5, 0, 7, 0, 9],
            [5, 0, 0, 4, 7, 0, 0, 2, 0],
            [0, 0, 0, 0, 4, 0, 0, 0, 0],
            [0, 5, 6, 0, 8, 9, 2, 0, 7],
            [8, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 6, 0, 0, 0, 0, 2],
            [0, 7, 2, 0, 0, 1, 0, 4, 5],
            [9, 0, 5, 7, 2, 0, 0, 6, 1],
          ],
          solution: [
            [7, 3, 8, 9, 1, 2, 4, 5, 6],
            [1, 2, 4, 3, 5, 6, 7, 8, 9],
            [5, 6, 9, 4, 7, 8, 1, 2, 3],
            [2, 1, 3, 5, 4, 7, 6, 9, 8],
            [4, 5, 6, 1, 8, 9, 2, 3, 7],
            [8, 9, 7, 2, 6, 3, 5, 1, 4],
            [3, 4, 1, 6, 9, 5, 8, 7, 2],
            [6, 7, 2, 8, 3, 1, 9, 4, 5],
            [9, 8, 5, 7, 2, 4, 3, 6, 1],
          ],
        }),
      5000,
    ),
  )
}
