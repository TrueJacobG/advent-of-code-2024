import { readFile } from "../utils/file.ts";
export const day9 = () => {
  part1();
  part2();
};

const part1 = () => {
  const data: string[] = readFile("day9").split("");

  const s: string[] = createStringWithEmptySpaces(data);
  let numberOfEmpties: number = s.filter((item) => item === ".").length;

  let searched: number = s.length - 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ".") {
      for (let j = searched; j >= 0; j--) {
        if (s[j] !== ".") {
          [s[i], s[j]] = [s[j], s[i]];
          searched--;
          break;
        }
      }
      numberOfEmpties--;
    }

    if (numberOfEmpties == 0) {
      break;
    }
  }

  let result: number = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ".") {
      result += i * Number(s[i]);
    }
  }

  console.log(`Day 9 - Part 1 - Checksum is equal to ${result}`);
};

const createStringWithEmptySpaces = (data: string[]): string[] => {
  let result: string[] = [];

  let isEmpty = false;
  let index = 0;
  data.forEach((num) => {
    let symbol = null;
    if (isEmpty) {
      symbol = ".";
    } else {
      symbol = String(index);
      index++;
    }
    isEmpty = !isEmpty;

    for (let i = 0; i < Number(num); i++) {
      result.push(symbol);
    }
  });
  return result;
};

const part2 = () => {
  console.log(`Day 9 - Part 2 - Failed`);
};
