import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  let sum = 0;
  const ranges: { start: number; end: number }[] = data[0]
    .split(',')
    .map((range) => {
      const [start, end] = range.split('-').map(Number);
      return { start, end };
    });
  for (const range of ranges) {
    console.log(range);
    for (let id = range.start; id <= range.end; id++) {
      if (isInvalidId(id)) {
        console.log(id);
        sum += id;
      }
    }
  }
  return sum;
}

function isInvalidId(id: number): boolean {
  const idAsString = id.toString();
  return /^(\d+)\1+$/.test(idAsString);
}

await runSolution(day2b);
