import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  const ranges = getRanges(data);
  console.log(ranges.length);
  const freshIds = new Set<number>();
  const mergedRanges = mergeRanges(ranges);

  return mergedRanges.reduce(
    (prev, curr) => (prev += curr[1] - curr[0] + 1),
    0
  );
}

function getRanges(data: string[]): number[][] {
  const emptyLine = data.indexOf('');
  const ranges = data
    .slice(0, emptyLine)
    .map((range) => range.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]);
  return ranges;
}

function mergeRanges(ranges: number[][]): number[][] {
  const mergedRanges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    const last = mergedRanges[mergedRanges.length - 1];
    const isOverlap = start <= last[1];
    if (isOverlap) {
      last[1] = Math.max(last[1], end);
    } else {
      mergedRanges.push([start, end]);
    }
  }

  return mergedRanges;
}

await runSolution(day5b);
