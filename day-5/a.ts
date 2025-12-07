import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const { ranges, ids } = processData(data);
  const freshIds = [];
  for (const id of ids) {
    if (rangeIncludeId(ranges, id)) {
      freshIds.push(id);
    }
  }
  return freshIds.length;
}

function processData(data: string[]): {
  ranges: number[][];
  ids: number[];
} {
  const emptyLine = data.indexOf('');
  const ranges = data
    .slice(0, emptyLine)
    .map((range) => range.split('-').map(Number));
  const ids = data.slice(emptyLine + 1).map(Number);
  return { ranges, ids };
}

function rangeIncludeId(ranges: number[][], id: number): boolean {
  for (const range of ranges) {
    if (id >= range[0] && id <= range[1]) {
      return true;
    }
  }
  return false;
}

await runSolution(day5a);
