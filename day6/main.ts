import { readFile } from "./../utils/file.ts";
export const day6 = (): void => {
  part1();
  part2();
};

interface Cords {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

const directionRotation: { [key in Direction]: Direction } = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

const movement: { [key in Direction]: Cords } = {
  up: { x: -1, y: 0 },
  right: { x: 0, y: 1 },
  down: { x: 1, y: 0 },
  left: { x: 0, y: -1 },
};

const movementReverse: { [key in Direction]: Cords } = {
  up: { x: 1, y: 0 },
  right: { x: 0, y: -1 },
  down: { x: -1, y: 0 },
  left: { x: 0, y: 1 },
};

const part1 = (): void => {
  const map = readFile("day6")
    .split("\n")
    .map((line) => line.split(""));

  const startCords = findStart(map);
  const mapWithTrace = processMap(map, startCords);
  const numberOfTraces = countTrace(mapWithTrace);

  console.log(`Day 6 - Part 1 - Map has number of trace equal to ${numberOfTraces}`);
};

const findStart = (map: string[][]): Cords => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "^") {
        return { x: i, y: j };
      }
    }
  }
  throw new Error("Cannot happened");
};

const processMap = (map: string[][], startCords: Cords): string[][] => {
  let direction: Direction = "up";
  let isInMap: boolean = true;
  let currentCords: Cords = { x: startCords.x, y: startCords.y };

  while (isInMap) {
    if (currentCords.x < 0 || currentCords.y < 0 || currentCords.x >= map.length || currentCords.y >= map[0].length) {
      console.log("Map processed");
      isInMap = false;
      break;
    }

    if (map[currentCords.x][currentCords.y] === "#") {
      currentCords = stepBack(currentCords, direction);
      direction = directionRotation[direction];
    }

    map[currentCords.x][currentCords.y] = "X";
    currentCords = move(currentCords, direction);
  }

  return map;
};

const stepBack = (currentCords: Cords, direction: Direction): Cords => {
  return { x: currentCords.x + movementReverse[direction].x, y: currentCords.y + movementReverse[direction].y };
};

const move = (currentCords: Cords, direction: Direction): Cords => {
  return { x: currentCords.x + movement[direction].x, y: currentCords.y + movement[direction].y };
};

const countTrace = (map: string[][]): number => {
  return map.flat().filter((field) => field === "X").length;
};

const part2 = () => {
  const map = readFile("day6")
    .split("\n")
    .map((line) => line.split(""));

  const startCords = findStart(map);

  console.log(`Day 6 - Part 2 - Number of map with loops is equal to FAILED`);
};
