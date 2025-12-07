import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const NUMBER_OF_STEPS = 100;
  const { countOfZeros } = data.reduce(
    (acc: { position: number; countOfZeros: number }, curr: string) => {
      const direction = curr[0];
      const fullDistance = Number(curr[0].slice(1));
      const distance = fullDistance % NUMBER_OF_STEPS;
      let nextPosition: number;
      nextPosition =
        direction === 'L' ? acc.position - distance : acc[0] + distance;

      nextPosition = wrapAround(nextPosition, NUMBER_OF_STEPS);

      if (nextPosition === 0) {
        return { position: nextPosition, countOfZeros: acc.countOfZeros + 1 };
      }

      return { position: nextPosition, countOfZeros: acc.countOfZeros };
    },
    { position: 50, countOfZeros: 0 }
  );
  return countOfZeros;
}

await runSolution(day1a);

function wrapAround(num: number, max: number): number {
  return ((num % max) + max) % max;
}
