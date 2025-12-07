import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  let totalAccessibleRolls = 0;
  const rows = data.length;
  const cols = data[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        data[row][col] === '@' &&
        acceptableNumOfAdjustmentCells(data, row, col)
      ) {
        totalAccessibleRolls++;
      }
    }
  }

  return totalAccessibleRolls;
}

function acceptableNumOfAdjustmentCells(
  data: string[],
  row: number,
  col: number
): boolean {
  let countAdjustableRolls = 0;
  const adjustableCells = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const cell of adjustableCells) {
    const newRow = row + cell[0];
    const newCol = col + cell[1];
    const isRowValid = newRow >= 0 && newRow < data.length;
    const isColValid = newCol >= 0 && newCol < data[1].length;
    if (isRowValid && isColValid && data[newRow][newCol] === '@') {
      countAdjustableRolls++;
    }
    if (countAdjustableRolls >= 4) {
      return false;
    }
  }
  return true;
}

await runSolution(day4a);
