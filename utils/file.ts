import * as fs from "node:fs";

export const readFile = (filename: string): string => {
  try {
    if (filename.endsWith("input.txt")) {
      return fs.readFileSync(filename, "utf8");
    } else {
      return fs.readFileSync(`${filename}/input.txt`, "utf8");
    }
  } catch (e) {
    console.error("Error during reading a file", e);
    return "";
  }
};
