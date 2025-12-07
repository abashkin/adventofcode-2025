import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  let sum = 0;
  const ranges: { start: number; end: number }[] = data[0]
    .split(',')
    .map((range) => {
      const [start, end] = range.split('-');
      return { start, end };
    })
    .map(mapToEvenLength)
    .filter((range) => range.end > range.start);
  for (const range of ranges) {
    for (let id = range.start; id <= range.end; id++) {
      if (isInvalidId(id)) {
        console.log(id);
        sum += id;
      }
    }
  }
  return sum;
}

function mapToEvenLength(range: { start: string; end: string }): {
  start: number;
  end: number;
} {
  const { start, end } = range;

  return {
    start: start.length % 2 === 0 ? Number(start) : 10 ** start.length,
    end: end.length % 2 === 0 ? Number(end) : 10 ** (end.length - 1),
  };
}

function isInvalidId(id: number): boolean {
  const idstr = id.toString();
  const first = idstr.slice(0, idstr.length / 2);
  const last = idstr.slice(idstr.length / 2);
  return first === last;
}

await runSolution(day2a);
