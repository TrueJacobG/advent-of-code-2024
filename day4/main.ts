import { readFile } from "./../utils/file.ts";
export const day4 = () => {
  part1();
  part2();
};

const part1 = () => {
  const data = readFile("day4/input.txt")
    .split("\n")
    .map((line) => line.split(""));

  let numberOfXmas = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] == "X") {
        numberOfXmas += checkAllDirections(data, i, j);
      }
    }
  }

  console.log(`Day 4 - Part 1 - Number of XMAS is equal to ${numberOfXmas}`);
};

const checkAllDirections = (data: string[][], i: number, j: number): number => {
  const directions = [
    { di: 0, dj: 1 },
    { di: 0, dj: -1 },
    { di: -1, dj: 0 },
    { di: 1, dj: 0 },
    { di: -1, dj: 1 },
    { di: 1, dj: 1 },
    { di: -1, dj: -1 },
    { di: 1, dj: -1 },
  ];

  let number = 0;

  for (const dirs of directions) {
    if (checkDirection(data, i, j, dirs.di, dirs.dj)) {
      number++;
    }
  }

  return number;
};

const checkDirection = (data: string[][], i: number, j: number, di: number, dj: number) => {
  try {
    return data[i + di][j + dj] === "M" && data[i + 2 * di][j + 2 * dj] === "A" && data[i + 3 * di][j + 3 * dj] === "S";
  } catch (_e) {
    return false;
  }
};

const part2 = () => {
  const data: string[][] = readFile("day4/input.txt")
    .split("\n")
    .map((line) => line.split(""));

  let numberOfXmas = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] == "A") {
        numberOfXmas += checkDiagonal(data, i, j) ? 1 : 0;
      }
    }
  }

  console.log(`Day 4 - Part 2 - Number of XMAS is equal to ${numberOfXmas}`);
};

const checkDiagonal = (gridData: string[][], row: number, col: number): boolean => {
  let patternCount = 0;

  const directions = [
    [-1, -1, 1, 1],
    [1, 1, -1, -1],
    [1, -1, -1, 1],
    [-1, 1, 1, -1],
  ];

  for (const dirs of directions) {
    patternCount += checkDiagonalPattern(gridData, row, col, dirs[0], dirs[1], dirs[2], dirs[3]) ? 1 : 0;
  }

  return patternCount >= 2;
};

const checkDiagonalPattern = (
  data: string[][],
  i: number,
  j: number,
  rowOffset1: number,
  colOffset1: number,
  rowOffset2: number,
  colOffset2: number
): boolean => {
  try {
    return data[i + rowOffset1][j + colOffset1] == "M" && data[i + rowOffset2][j + colOffset2] == "S";
  } catch (_e) {
    return false;
  }
};
