import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const NUMBER_OF_STEPS = 100;
  let position = 50;
  let numberOfClicks = 0;
  let wasAtZero = false;

  for (const command of data) {
    const direction = command[0];
    const fullDistance = Number(command.slice(1));
    const distance = fullDistance % NUMBER_OF_STEPS;

    numberOfClicks += Math.floor(fullDistance / NUMBER_OF_STEPS);
    let next = direction === 'L' ? position - distance : position + distance;

    const isClicked = next < 0 || next > NUMBER_OF_STEPS;

    next = wrapAround(next, NUMBER_OF_STEPS);

    if ((!wasAtZero && isClicked) || next === 0) {
      numberOfClicks++;
    }

    wasAtZero = next === 0;
    position = next;
  }
  return numberOfClicks;
}

await runSolution(day1a);

function wrapAround(num: number, max: number): number {
  return ((num % max) + max) % max;
}
