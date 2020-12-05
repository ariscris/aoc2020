
import * as fs from 'fs';

const sample = getData('./sample.txt');
let res = calc2(sample, 2020);
console.log(`sample result = ${res[0] * res[1]}`)
res = calc3(sample, 2020);
console.log(`sample result = ${res[0] * res[1] * res[2]}`)

const input = getData('./input.txt');
res = calc2(input, 2020);
console.log(`input result = ${res[0] * res[1]}`)
res = calc3(input, 2020);
console.log(`input result = ${res[0] * res[1] * res[2]}`)


function getData(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\r?\n/);
  const numFrequency: Map<number, number> = new Map<number, number>();
  data.forEach(s => {
    const n = Number.parseInt(s);
    if (numFrequency.get(n)) {
      numFrequency.set(n, numFrequency.get(n) + 1);
    } else {
      numFrequency.set(n, 1);
    }
  });
  console.log(`Found ${numFrequency.size} entries`);

  return numFrequency;
}

function calc2(numFrequency: Map<number, number>, total: number, used: Array<number> = []) {

  for(let n of Array.from( numFrequency.keys()) ) {
    const diff = total - n;
    if (diff > 0) {
      if (diff == n) {
        if (numFrequency.get(diff) >= 2) {
          return [diff, n];
        }
      } else {

        if (numFrequency.get(diff) >= 1) {
          return [diff, n];
        }
      }
    }
  }
}

function calc3(numFrequency: Map<number, number>, total: number) {
  for(let n of Array.from( numFrequency.keys()) ) {
    const diff = total - n;
    if (diff > 0) {
      const res = calc2(numFrequency, diff, [n]);
      if (res) {
        return res.concat(n);
      }
    }
  }
}