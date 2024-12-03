import { readFile } from "./../utils/file.ts";
export const day3 = () => {
  //   part1();
  part2();
};

const part1 = () => {
  const data = readFile("day3/input.txt");
  const regex = /mul\(\d+,\d+\)/g;
  const allExpresions = [...data.matchAll(regex)];

  let multiplies: number = 0;

  for (let i = 0; i < allExpresions.length; i++) {
    const [x, y] = allExpresions[i][0].replace("mul(", "").replace(")", "").split(",");
    multiplies += Number(x) * Number(y);
  }

  console.log(`Day 3 - Part 1 - Multiplied result is equal to ${multiplies}`);
};

const part2 = () => {
  const data = readFile("day3/input.txt");
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const allExpresions = [...data.matchAll(regex)];

  let multiplies: number = 0;
  let flag: boolean = true;

  for (let i = 0; i < allExpresions.length; i++) {
    if (allExpresions[i][0] === "don't()") {
      flag = false;
      continue;
    }

    if (allExpresions[i][0] === "do()") {
      flag = true;
      continue;
    }

    if (flag) {
      const [x, y] = allExpresions[i][0].replace("mul(", "").replace(")", "").split(",");
      multiplies += Number(x) * Number(y);
    }
  }

  console.log(`Day 3 - Part 2 - Multiplied (enabled or disabled) result is equal to ${multiplies}`);
};
