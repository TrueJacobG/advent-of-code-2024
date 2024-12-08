import { readFile } from "../utils/file.ts";

export const day7 = (): void => {
  part1();
  part2();
};

const part1 = () => {
  const data = readFile("day7").split("\n");

  let sum: number = 0;

  data.forEach((line) => {
    const [r, n] = line.split(": ");
    const result = parseInt(r);
    const numbers = n.split(" ").map(Number);
    if (isCorrect(result, numbers, ["+", "*"])) {
      sum += result;
    }
  });

  console.log(`Day 7 - Part 1 - Sum of equations is equal to ${sum}`);
};

const isCorrect = (expected: number, numbers: number[], acceptedSymbols: string[]): boolean => {
  const numbersCount = numbers.length;

  const symbols = generateSymbols(numbersCount - 1, acceptedSymbols);

  return calculateEquations(numbers, symbols, expected);
};

const generateSymbols = (numbersCount: number, symbols: string[]): string[] => {
  if (numbersCount <= 0) {
    return [];
  }

  const rec = (current: string, remainingLength: number): string[] => {
    if (remainingLength === 0) {
      return [current];
    }

    const results: string[] = [];
    for (const symbol of symbols) {
      results.push(...rec(current + symbol, remainingLength - 1));
    }
    return results;
  };

  return rec("", numbersCount);
};

const calculateEquations = (numbers: number[], symbolsCombination: string[], expected: number): boolean => {
  for (let j = 0; j < symbolsCombination.length; j++) {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      const symbol = symbolsCombination[j][i - 1];

      if (symbol == "|") {
        result = Number(String(result) + String(numbers[i]));
      } else {
        result = doMath(String(result) + symbol + String(numbers[i]));
      }
    }

    if (result === expected) {
      return true;
    }
  }

  return false;
};

const doMath = (equation: string): number => {
  return eval(equation);
};

const part2 = () => {
  const data = readFile("day7").split("\n");

  let sum: number = 0;

  data.forEach((line) => {
    const [r, n] = line.split(": ");
    const result = parseInt(r);
    const numbers = n.split(" ").map(Number);
    if (isCorrect(result, numbers, ["+", "*", "|"])) {
      sum += result;
    }
  });

  console.log(`Day 7 - Part 2 - Sum of equations is equal to ${sum}`);
};
