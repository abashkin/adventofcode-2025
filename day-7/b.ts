import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day7b(data: string[]) {
  const grid = data.filter((row) => row.includes('S') || row.includes('^'));
  const rows = grid.length;
  const cols = grid[0].length;
  const start = grid[0].indexOf('S');
  const timelines = new Array(cols).fill(0);
  timelines[start] = 1;

  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isSplitter = grid[row][col] === '^';
      if (isSplitter) {
        console.log(`SPLITTER AT ${row}:${col}`);
        const left = col - 1;
        const right = col + 1;
        const base = timelines[col];
        timelines[left] += base;
        timelines[right] += base;
        timelines[col] = 0;
      }
    }
    console.log(timelines);
  }

  return timelines.reduce((a, b) => a + b);
}

function addTimeline(
  map: Map<string, number>,
  row: number,
  col: number,
  baseValue: number
) {
  console.log(`Adding to ${row}-${col} value: ${baseValue}`);
  const key = `[${row}:${col}]`;
  const mapValue = map.get(key);
  console.log(`VALUE AT ${row}-${col}: ${mapValue}`);
  const newValue = mapValue ? mapValue + 1 : baseValue;
  map.set(key, newValue);
}

function drawRow(map: Map<string, number>, row: number, cols: number): void {
  const keys = [...map.keys()].filter((k) => k.startsWith(`[${row}`));
  const rowArr = [];
  for (let index = 0; index < cols; index++) {
    const key = `[${row}:${index}]`;
    const val = map.get(key) || 0;
    rowArr.push(val);
  }
  console.log(rowArr);
}

await runSolution(day7b);
