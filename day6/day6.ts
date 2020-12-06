import * as fs from 'fs';
import { cachedDataVersionTag } from 'v8';

calc('./sample.txt', countUnique);
calc('./input.txt', countUnique);
calc('./sample.txt', countConsistent);
calc('./input.txt', countConsistent);

function calc(fileName: string, f: (s: string) => number ) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n\n/);
  let total = 0;
  data.forEach(s => {
    const i = f(s);
    total = total + i;
  })

  console.log(`total: ${total}`)
}

function countUnique(s: string) {
  s = s.replace(/\s/g, '');
  let chars = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (!chars.has(c)) {
      chars.add(c);
    }
  }
  // console.log(`${s} => ${chars.size}`)
  return chars.size;
}

function countConsistent(s: string) {
  const personCount = s.split(/\n/).length;
  s = s.replace(/\s/g, '');
  const freq = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (!freq.has(c)) {
      freq.set(c, 1);
    } else {
      freq.set(c, freq.get(c) + 1);
    }
  }

  let matches = 0;
  for (let v of Array.from(freq.values()) ) {
    if (v === personCount)
      matches = matches + 1;
  }

  console.log({s, freq, personCount, matches});

  return matches;
}
