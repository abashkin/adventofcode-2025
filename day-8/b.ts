import { runSolution } from '../utils.ts';

type Point = {
  x: number;
  y: number;
  z: number;
};

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
  const points: Point[] = [];
  const distances: [number, number, number][] = [];
  const circuits: number[][] = [];
  for (const pointLine of data) {
    const [x, y, z] = pointLine.split(',').map(Number);
    points.push({ x, y, z });
    circuits.push([points.length - 1]);
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateDistance(points[i], points[j]);
      distances.push([distance, i, j]);
    }
  }
  distances.sort((d1, d2) => d1[0] - d2[0]);
  let x1 = 0;
  let x2 = 0;
  let k = 0;
  let len = circuits.length;
  while (len > 1) {
    const [_, p1, p2] = distances[k++];
    len = createCircuit(circuits, p1, p2);
    x1 = points[p1].x;
    x2 = points[p2].x;
  }

  return x1 * x2;
}

function calculateDistance(p: Point, q: Point): number {
  return (
    Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2)
  );
}

function createCircuit(circuits: number[][], p1: number, p2: number) {
  const c1 = circuits.find((c) => c.includes(p1))!;
  const c1i = circuits.findIndex((c) => c.includes(p1));
  if (c1.includes(p2)) {
    return circuits.length;
  }
  const c2 = circuits.find((c) => c.includes(p2))!;
  const c2i = circuits.findIndex((c) => c.includes(p2));
  const newCircuit: number[] = [...c1, ...c2];
  for (let i = 0; i < circuits.length; i++) {
    if (i === c1i) {
      circuits[i] = newCircuit;
    }
    if (i === c2i) {
      circuits[i] = [];
    }
  }

  return circuits.filter((c) => c.length).length;
}

await runSolution(day8b);
