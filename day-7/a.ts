import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  let splitCounter = 0;
  const rows = data.length;
  const cols = data[0].length;
  const start = data[0].indexOf('S');
  const beamsMap = new Map<number, number>();
  beamsMap.set(start, 0);

  for (let i = 0; i < rows; i++) {
    const isEmptyRow = !data[i].includes('^');
    if (isEmptyRow) continue;
    for (const [beamCol, beamRow] of beamsMap) {
      const nextRow = beamRow + 1;
      const isSplitter = data[i][beamCol] === '^';
      if (isSplitter) {
        splitCounter++;
        const beamLeft = beamCol - 1;
        const beamRight = beamCol + 1;
        beamsMap.delete(beamCol);
        if (beamLeft >= 0) {
          beamsMap.set(beamLeft, i);
        }
        if (beamRight < cols) {
          beamsMap.set(beamRight, i);
        }
      } else {
        beamsMap.set(beamCol, nextRow);
      }
    }
  }

  return splitCounter;
}

await runSolution(day7a);
