import * as fs from "node:fs";

export const readFile = (filename: string): string => {
  try {
    return fs.readFileSync(filename, "utf8");
  } catch (e) {
    console.error("Error during reading a file", e);
    return "";
  }
};
