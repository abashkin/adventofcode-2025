import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  let totalAccessibleRolls = 0;
  const rows = data.length;
  const cols = data[0].length;
  let grid = [...data];

  let gridHasAccessibleRolls = false;
  do {
    const accessibleRols: [number, number][] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          grid[row][col] === '@' &&
          acceptableNumOfAdjustmentCells(grid, row, col)
        ) {
          grid[row] =
            grid[row].substring(0, col) + 'x' + grid[row].substring(col + 1);
          accessibleRols.push([row, col]);
        }
      }
    }
    console.log(accessibleRols.length);
    gridHasAccessibleRolls = accessibleRols.length > 0;
    grid = [...removeAccessibleRolls(grid, accessibleRols)];
    totalAccessibleRolls += accessibleRols.length;
    console.log(gridHasAccessibleRolls);
  } while (gridHasAccessibleRolls);

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

function removeAccessibleRolls(
  grid: string[],
  accessibleRols: [number, number][]
): string[] {
  const newGrid = [...grid];
  accessibleRols.forEach((roll) => {
    newGrid[roll[0]] =
      newGrid[roll[0]].substring(0, roll[1]) +
      'x' +
      newGrid[roll[0]].substring(roll[1] + 1);
  });
  console.log(newGrid);
  return newGrid;
}

await runSolution(day4b);
