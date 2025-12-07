import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  return data.map(getBankJoiltage).reduce((a, b) => a + b, 0);
}

function getBankJoiltage(bank: string): number {
  const batterySize = 12;
  let joltage = '';
  let start = 0;

  while (joltage.length < batterySize) {
    const remaining = batterySize - joltage.length;
    const windowEnd = bank.length - remaining;

    // Find max digit in the allowed window
    let maxDigit = '0';
    let maxIndex = start;

    for (let i = start; i <= windowEnd; i++) {
      if (bank[i] > maxDigit) {
        maxDigit = bank[i];
        maxIndex = i;
      }
    }

    joltage += maxDigit;
    start = maxIndex + 1;
  }

  return Number(joltage);
}

await runSolution(day3b);
