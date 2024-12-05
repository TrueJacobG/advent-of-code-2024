import { readFile } from "./../utils/file.ts";
export const day5 = (): void => {
  part1();
  part2();
};

const prepareData = (): [number[][], number[][]] => {
  const data = readFile("day5");

  const [rulesTemp, updatesTemp] = data.split("\n\n");

  const rules: number[][] = rulesTemp.split("\n").map((line) => {
    return line.split("|").map(Number);
  });
  const updates: number[][] = updatesTemp.split("\n").map((line) => {
    return line.split(",").map(Number);
  });

  return [rules, updates];
};

const part1 = (): number => {
  const [rules, updates] = prepareData();

  // key - number
  // value - list of values are before key
  const rulesDictionary = createRulesDictionary(rules);

  let sumOfCorrectMiddle = 0;

  updates.forEach((update) => {
    if (updateFollowsRules(update, rulesDictionary)) {
      sumOfCorrectMiddle += update[Math.floor(update.length / 2)];
    }
  });

  console.log(`Day 5 - Part 1 - Sum of middle numbers is equal to ${sumOfCorrectMiddle}`);

  return sumOfCorrectMiddle;
};

interface RulesDictionary {
  [key: number]: number[];
}

const createRulesDictionary = (rules: number[][]) => {
  const rulesDictionary: RulesDictionary = {};

  rules.forEach((rule) => {
    if (rule[0] in rulesDictionary) {
      rulesDictionary[rule[0]].push(rule[1]);
    } else {
      rulesDictionary[rule[0]] = [rule[1]];
    }
  });

  return rulesDictionary;
};

const updateFollowsRules = (update: number[], rulesDictionary: RulesDictionary): boolean => {
  for (let i = update.length - 1; i >= 0; i--) {
    const key = update[i];
    const keyHasToBeBeforeThisNumbers = rulesDictionary[key];
    const numbersThatWereBeforeKey = update.slice(0, i);

    if (keyHasToBeBeforeThisNumbers.some((n) => numbersThatWereBeforeKey.includes(n))) {
      return false;
    }
  }

  return true;
};

const part2 = (): void => {
  const [rules, updates] = prepareData();

  const rulesDictionary = createRulesDictionary(rules);

  let sumOfMiddle = 0;

  updates.forEach((update) => {
    if (!updateFollowsRules(update, rulesDictionary)) {
      let sorted = update.sort((a: number, b: number) => {
        if (a in rulesDictionary && rulesDictionary[a].includes(b)) {
          return -1;
        } else if (b in rules && rules[b].includes(a)) {
          return 1;
        }
        return 0;
      });
      sumOfMiddle += sorted[Math.floor(update.length / 2)];
    }
  });

  console.log(`Day 5 - Part 2 - Sum of middle numbers is equal to ${sumOfMiddle}`);
};
