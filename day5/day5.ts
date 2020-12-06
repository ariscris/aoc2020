import * as fs from 'fs';

getMax('./input.txt');
console.log(`missing: ${findMissing('./input.txt')}`);

function getMax(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  let max = 0;
  data.forEach(s => {
    const i = makeInt(s);
    if (i > max) {
      max = i;
    }
  })

  console.log(`max: ${max}`)
}

function findMissing(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  const seats = [];
  data.forEach(s => {
    const i = makeInt(s);
    seats.push(i);
  })
  seats.sort(function(a, b){return a-b});
  console.log(seats);
  for (let i = 1; i < seats.length - 1; i++) {
    if (seats[i] + 1 != seats[i+1]) {
      return seats[i] + 1;
    }
  }
}

function makeInt(s: string) {
  s = s.replace(/F/g, '0');
  s = s.replace(/B/g, '1');
  s = s.replace(/L/g, '0');
  s = s.replace(/R/g, '1');
  
  const i = Number.parseInt(s, 2);
  // console.log({s,i});
  return i;
}