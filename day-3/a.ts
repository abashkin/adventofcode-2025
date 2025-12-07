import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  return data.map(getBankJoiltage).reduce((a, b) => a + b, 0);
}

function getBankJoiltage(bank: string): number {
  const batteries = bank.split('').map(Number);
  console.log(batteries);

  let maxDigit = 9;
  while (maxDigit >= 0) {
    const maxDigitIndx = batteries.indexOf(maxDigit);
    if (maxDigitIndx >= 0 && maxDigitIndx !== batteries.length - 1) {
      const maxDigitSecond = batteries
        .slice(maxDigitIndx + 1)
        .sort((a, b) => b - a)[0];
      console.log(10 * maxDigit + maxDigitSecond);
      return 10 * maxDigit + maxDigitSecond;
    }
    maxDigit--;
  }
  return 0;
}

await runSolution(day3a);
