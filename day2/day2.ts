
import * as fs from 'fs';

calc('./sample.txt', isValid1);
calc('./input.txt', isValid1);
calc('./sample.txt', isValid2);
calc('./input.txt', isValid2);

function calc(fileName: string, func: (s: string) => boolean) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\r?\n/);
  let validCount = 0;
  data.forEach(s => {
    if (func(s)) {
      validCount = validCount + 1;
    }
  })

  console.log(`valid passwords for ${fileName}: ${validCount}`)
}

function isValid1(line: string) {
  const parts = line.split(' ');
  if (parts.length != 3) {
    return false;
  }
  const freqRange = parts[0].split('-').map(s => Number.parseInt(s));
  const letter = parts[1].charAt(0);
  const password = parts[2];

  let freq = 0;
  for (let i = 0; i < password.length; i++) {
    const c = password.charAt(i);
    if (c === letter) {
      freq = freq + 1;
    }
  }

  return freq >= freqRange[0] && freq <= freqRange[1];
}


function isValid2(line: string) {
  const parts = line.split(' ');
  if (parts.length != 3) {
    return false;
  }
  const positions = parts[0].split('-').map(s => Number.parseInt(s));
  const letter = parts[1].charAt(0);
  const password = parts[2];

  const isFirst = password.charAt(positions[0]-1) === letter;
  const isSecond = password.charAt(positions[1]-1) === letter;

  return (isFirst && !isSecond) || (isSecond && !isFirst);
}