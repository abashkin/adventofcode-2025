import { runSolution } from '../utils.ts';

type Point = {
  x: number;
  y: number;
  z: number;
};

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  const steps = 1000;
  const points: Point[] = [];
  const distances: { key: string; distance: number }[] = [];
  const circuits: number[][] = [];
  for (const pointLine of data) {
    const [x, y, z] = pointLine.split(',').map(Number);
    points.push({ x, y, z });
    circuits.push([points.length - 1]);
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const key = `${i}-${j}`;
      const distance = calculateDistance(points[i], points[j]);
      distances.push({ key, distance });
    }
  }
  distances.sort((d1, d2) => d1.distance - d2.distance);

  for (let i = 0; i < steps; i++) {
    const shortest = distances.shift();
    const [p1, p2] = shortest.key.split('-').map(Number);
    createCircuit(circuits, p1, p2);
  }

  const largestCircuits = circuits
    .map((c) => c.length)
    .toSorted((c1, c2) => c2 - c1);
  const [c1, c2, c3] = largestCircuits;

  return c1 * c2 * c3;
}

function calculateDistance(p: Point, q: Point): number {
  return Math.sqrt(
    Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2)
  );
}

function createCircuit(circuits: number[][], p1: number, p2: number) {
  const c1 = circuits.find((c) => c.includes(p1))!;
  const c1i = circuits.findIndex((c) => c.includes(p1));
  if (c1.includes(p2)) {
    return;
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
}

await runSolution(day8a);
