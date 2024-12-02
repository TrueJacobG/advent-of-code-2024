import { readFile } from "./../utils/file.ts";
export const day2 = () => {
  part1();
  part2();
};

const part1 = () => {
  const data = readFile("day2/input.txt");

  let matrix: number[][] = [];
  data.split("\n").forEach((line) => {
    matrix = [...matrix, line.split(" ").map(Number)];
  });

  let numberOfSafe = 0;

  matrix.forEach((line) => {
    if (isSafe(line)) {
      numberOfSafe++;
    }
  });

  console.log(`Day 2 - Part 1 - Number of safe is equal to ${numberOfSafe}`);
};

const part2 = () => {
  const data = readFile("day2/input.txt");

  let matrix: number[][] = [];
  data.split("\n").forEach((line) => {
    matrix = [...matrix, line.split(" ").map(Number)];
  });

  let numberOfSafe = 0;

  matrix.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      const newLine = [...line.slice(0, i), ...line.slice(i + 1)];

      if (isSafe(newLine)) {
        numberOfSafe++;
        break;
      }
    }
  });

  console.log(`Day 2 - Part 2 - Number of safe is equal to ${numberOfSafe}`);
};

const isSafe = (line: number[]) => {
  const isIncreasing = line[0] < line[1];
  let flag = true;

  for (let i = 1; i < line.length; i++) {
    if (line[i - 1] >= line[i] && isIncreasing == true) {
      flag = false;
      break;
    }

    if (line[i - 1] <= line[i] && isIncreasing == false) {
      flag = false;
      break;
    }

    const diff = Math.abs(line[i - 1] - line[i]);
    if (diff > 3) {
      flag = false;
      break;
    }
  }

  return flag;
};
