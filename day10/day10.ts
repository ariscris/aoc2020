import * as fs from 'fs';

console.log({smallsample: calc(parse('./smallsample.txt'))});
console.log({sample: calc(parse('./sample.txt'))});
console.log({input: calc(parse('./input.txt'))});
console.log({smallsample: count(parse('./smallsample.txt'))});

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

function count(nums: Array<number>) {
  nums.push(nums[nums.length-1] + 3)
  let curr = 0;
  let count = 1;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    console.log({i, n, curr, count, next1: nums[i+1], next2: nums[i+2]})
    if (i + 1 < nums.length && nums[i+1] - curr <= 3 )
      count++;
    if (i + 2 < nums.length && nums[i+2] - curr <= 3 )
      count++;

    curr = n;
  }
  return count;
}

function parse(fileName: string): Array<number> {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  const nums = data.map((s) => Number.parseInt(s));
  return nums.sort((a, b) => a-b);
}