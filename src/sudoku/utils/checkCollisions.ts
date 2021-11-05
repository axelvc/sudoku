import { Coords, BoxData, SudokuState } from '../sudokuSlice'

function getRowSiblings(puzzle: BoxData[][], { row, col }: Coords): BoxData[] {
  return puzzle[row].filter((box, i) => box.value && i !== col)
}

function getColSiblings(puzzle: BoxData[][], { row, col }: Coords): BoxData[] {
  return puzzle.reduce((siblings, r, i) => {
    const box = r[col]

    if (box.value && i !== row) {
      siblings.push(box)
    }

    return siblings
  }, [])
}

function getBlockSiblings(puzzle: BoxData[][], { row, col }: Coords): BoxData[] {
  const blockRow = Math.floor(row / 3)
  const blockCol = Math.floor(col / 3)

  return puzzle.reduce((siblings, r, rI) => {
    r.forEach((box, cI) => {
      if (
        box.value &&
        rI !== row &&
        cI !== col &&
        blockRow === Math.floor(rI / 3) &&
        blockCol === Math.floor(cI / 3)
      ) {
        siblings.push(box)
      }
    })

    return siblings
  }, [])
}

export default function checkCollisions(
  state: SudokuState,
  { row, col }: Coords,
  oldValue: number,
): void {
  const { puzzle } = state
  const box = puzzle[row][col]
  const siblings = [
    ...getRowSiblings(puzzle, { row, col }),
    ...getColSiblings(puzzle, { row, col }),
    ...getBlockSiblings(puzzle, { row, col }),
  ]

  if (box.errors) {
    box.errors = 0

    siblings.forEach(sibling => {
      if (sibling.value === oldValue) {
        sibling.errors--
      }
    })
  }

  siblings.forEach(sibling => {
    if (sibling.value === box.value) {
      sibling.errors++
      box.errors++
    }
  })
}
