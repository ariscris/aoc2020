import * as fs from 'fs';

console.log({sample: calc(parse('./sample.txt'))});
console.log({input: calc(parse('./input.txt'))});

function calc(nums: Array<number>) {
  nums.push(nums[nums.length-1] + 3)
  // console.log(nums)
  let curr = 0;
  let countDelta1 = 0;
  let countDelta3 = 0;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const delta = n - curr;
    // console.log({i, n, curr, delta})
    if (delta === 1)
      countDelta1++;
    else if (delta === 3)
      countDelta3++;
    curr = n;
  }
  return countDelta1 * countDelta3;
}

function parse(fileName: string): Array<number> {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  const nums = data.map((s) => Number.parseInt(s));
  return nums.sort((a, b) => a-b);
}