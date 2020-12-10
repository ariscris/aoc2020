import * as fs from 'fs';

const sampleData = load('./sample.txt');
const sampleInt = calc(5, sampleData);
console.log(`sample: ${sampleInt}`);
console.log(`sample: ${JSON.stringify(findContig(sampleInt, sampleData))}`);

const inputData = load('./input.txt');
const inputInt = calc(25, inputData);
console.log(`input: ${inputInt}}`);
console.log(`input: ${JSON.stringify(findContig(inputInt, inputData))}`);


function load(fileName: string): Array<number> {
  const nums = new Array<number>();
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  data.forEach(s => {
    const n = Number.parseInt(s);
    nums.push(n);
  });

  return nums;
}

function calc(preambleSize: number, nums: Array<number>) {
  const set = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (i < preambleSize) {
      set.add(n);
    } else {
      if (!findSum(n, set))
        return n;
      else {
        set.delete(nums[i-preambleSize]);
        set.add(n);
      }
    }
  }
}

function findSum(n: number, set: Set<number>) {
  for (let i of set) {
    if (n-i !== n && set.has(n - i))
      return true;
  }
  return false;
}

function findContig(n: number, nums: Array<number>) {
  for (let i = 0; i < nums.length; i++) {
    let runningTotal = n;
    for (let j = i; j < nums.length; j++) {
      runningTotal = runningTotal - nums[j];

      if (runningTotal === 0) {
        return getSmallLarge(nums, i, j);
      } else if (runningTotal < 0) {
        break;
      }
    }
  }
}

function getSmallLarge(nums: Array<number>, start: number, end: number) {
  let min = nums[start];
  let max = nums[start];
  for (let i = start; i <= end; i++) {
    const n = nums[i];
    if (n < min) 
      min = n;
    if (n > max)
      max = n;
  }
  return {min, max, sum: min+max}
}