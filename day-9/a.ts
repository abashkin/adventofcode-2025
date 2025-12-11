import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  let maxSquare = 0;
  const numberOfTiles = data.length;
  for (let i = 0; i < numberOfTiles; i++) {
    for (let j = i + 1; j < numberOfTiles; j++) {
      const p1 = data[i].split(',').map(Number);
      const p2 = data[j].split(',').map(Number);
      const square = getRectangleSquare(p1, p2);
      maxSquare = Math.max(maxSquare, square);
    }
  }

  return maxSquare;
}

function getRectangleSquare(p1: number[], p2: number[]) {
  const dx = Math.abs(p1[0] - p2[0] + 1);
  const dy = Math.abs(p1[1] - p2[1] + 1);

  return dx * dy;
}

await runSolution(day9a);
