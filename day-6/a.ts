import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  const processedData = processData(data);
  const problems = transposeData(processedData);
  console.log(problems);
  let result = 0;
  for (const problem of problems) {
    const operator = problem.pop();
    result += problem
      .map(Number)
      .reduce((a, b) => (operator === '+' ? a + b : a * b));
  }

  return result;
}

function processData(data: string[]) {
  return data.map((row) => row.split(' ').filter(Boolean));
}

function transposeData(data: string[][]): string[][] {
  const rows = data.length;
  const cols = data[0].length;
  const transposed = initRotatedArray(rows, cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      transposed[c][r] = data[r][c];
    }
  }

  return transposed;
}

function initRotatedArray(rows: number, cols: number): string[][] {
  const rotated = [];
  for (let j = 0; j < cols; j++) {
    rotated[j] = new Array(rows);
  }

  return rotated;
}

await runSolution(day6a);
