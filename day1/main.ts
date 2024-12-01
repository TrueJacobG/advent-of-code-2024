import { readFile } from "./../utils/file.ts";

export interface LeftRight {
  left: number[];
  right: number[];
}

export const day1 = () => {
  //   part1();
  part2();
};

const part1 = () => {
  const leftRight = getLeftRightData();
  leftRight.left.sort();
  leftRight.right.sort();

  let distance = 0;

  for (let i = 0; i < 1000; i++) {
    distance += Math.max(leftRight.left[i], leftRight.right[i]) - Math.min(leftRight.left[i], leftRight.right[i]);
  }

  console.log(`Part1: Distance is equal to ${distance}`);
};

const part2 = () => {
  const leftRight = getLeftRightData();

  let similarity = 0;

  for (let i = 0; i < 1000; i++) {
    similarity += leftRight.left[i] * calculateOccurrences(leftRight.left[i], leftRight.right);
  }

  console.log(`Part 2: Similarity score is equal to ${similarity}`);
};

const calculateOccurrences = (n: number, list: number[]): number => {
  return list.filter((x) => x == n).length;
};

const getLeftRightData = (): LeftRight => {
  const leftRight = { left: [], right: [] } as LeftRight;
  const data = readFile("day1/input.txt");
  const lines = data.split("\n");
  lines.forEach((line: string) => {
    const dataSplited = line.split("   ");
    leftRight.left.push(parseInt(dataSplited[0]));
    leftRight.right.push(parseInt(dataSplited[1]));
  });
  return leftRight;
};
