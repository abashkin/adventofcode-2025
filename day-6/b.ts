import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
  let result = 0;
  const cols = data[0].length;
  const splitedData = data.map((r) => r.split(''));
  let colCursor = cols - 1;
  let problem = [];
  let operator = '';
  while (colCursor >= 0) {
    const column = readColumn(splitedData, colCursor);
    const isEndOfProblem = !column.length;
    if (isEndOfProblem) {
      result += calculateProblem(problem, operator);
      problem = [];
      operator = '';
      colCursor--;
      continue;
    }
    const last = column.at(-1);
    if (last === '+' || last === '*') {
      operator = column.pop();
    }
    const number = Number(column.join(''));
    problem.push(number);
    colCursor--;
  }
  result += calculateProblem(problem, operator);

  return result;
}

function readColumn(data: string[][], cursor: number): string[] {
  const column = [];
  const rows = data.length;
  for (let i = 0; i < rows; i++) {
    const cell = data[i][cursor];
    if (cell !== ' ') {
      column.push(cell);
    }
  }
  return column;
}

function calculateProblem(problem: number[], operator: string): number {
  console.log(`Problem: ${problem}`);
  console.log(`Operator: ${operator}`);

  return problem.reduce((a, b) => (operator === '+' ? a + b : a * b));
}

await runSolution(day6b);
