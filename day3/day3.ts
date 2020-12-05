import * as fs from 'fs';

console.log(calc('./sample.txt', 3, 1));
console.log(calc('./input.txt', 3, 1));

console.log(
  calc('./sample.txt', 1, 1) *
  calc('./sample.txt', 3, 1) *
  calc('./sample.txt', 5, 1) *
  calc('./sample.txt', 7, 1) *
  calc('./sample.txt', 1, 2)
);

console.log(
  calc('./input.txt', 1, 1) *
  calc('./input.txt', 3, 1) *
  calc('./input.txt', 5, 1) *
  calc('./input.txt', 7, 1) *
  calc('./input.txt', 1, 2)
);

function calc(fileName: string, xdelta: number, ydelta: number) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\r?\n/);
  const xmax = data[0].length;
  const ymax = data.length;

  let treeCount = 0;
  let xpos = 0;
  for (let ypos = 0; ypos < ymax;) {
    xpos = (xpos + xdelta) % xmax;
    ypos = ypos + ydelta;
    if (ypos >= ymax) {
      break;
    }
    if (data[ypos].charAt(xpos) === '#') {
      treeCount = treeCount + 1;
    }
  }
  console.log(`tc=${treeCount}`)
  return treeCount;
}
