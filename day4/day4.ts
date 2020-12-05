import * as fs from 'fs';

calc('./sample.txt', isValid1);
calc('./input.txt', isValid1);

calc('./sample.txt', isValid2);
calc('./input.txt', isValid2);

function calc(fileName: string, func: (s: Map<string, string>) => boolean) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n\n/);
  let validCount = 0;
  data.forEach(s => {
    const m = mappify(s);
    if (func(m)) {
      validCount = validCount + 1;
    }
  })

  console.log(`valid passwords for ${fileName}: ${validCount}`)
}

function mappify(s: string) {
  s = s.replace(/\n/g, ' ');
  const items = s.split(' ');
  const m: Map<string, string> = new Map<string, string>();
  for (let item of items) {
    const pair = item.split(':');
    m.set(pair[0], pair[1]);
  }
  return m;
}

function isValid1(m: Map<string, string>) {
  return (m.has('ecl') && m.has('pid') && m.has('eyr') && m.has('hcl') && m.has('byr') &&
    m.has('iyr') && m.has('hgt'));
}

function isValid2(m: Map<string, string>) {
  if (!(m.has('ecl') && m.has('pid') && m.has('eyr') && m.has('hcl') && m.has('byr') &&
    m.has('iyr') && m.has('hgt'))) {
    console.log({m}, 'missing field')
    return false;
  }

  if (!checkYear(m.get('byr'), 1920, 2002) || !checkYear(m.get('iyr'), 2010, 2020) ||
    !checkYear(m.get('eyr'), 2020, 2030)) {
      console.log('bad year')
      return false;
    }

  const ht = m.get('hgt');
  if (!ht.endsWith('cm') && !ht.endsWith('in')) {
    console.log(`bad hgt ${ht}`);
    return false;
  }
  if (ht.endsWith('cm') && (Number.parseInt(ht) < 150 || Number.parseInt(ht) > 193)) {
    console.log(`bad cm ${ht}`);
    return false;
  }
  if (ht.endsWith('in') && (Number.parseInt(ht) < 59 || Number.parseInt(ht) > 76)) {
    console.log(`bad in ${ht}`);
    return false;
  }

  if (!m.get('hcl').match(/^#[0-9a-f]{6}$/)) {
    console.log(`bad hcl ${m.get('hcl')}`);
    return false;
  }

  const eye = m.get('ecl');
  const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  if (!colors.includes(eye)) {
    console.log(`bad eye ${eye}`);
    return false;
  }

  if (!m.get('pid').match(/^\d{9}$/)) {
    console.log(`bad pid ${m.get('pid')}`);
    return false;
  }

  return true;
}

function checkYear(s: string, min: number, max: number) {
  if (!s.match(/^\d{4}$/)) {
    console.log(`bad year ${s}`);
    return false;
  }
  const d = Number.parseInt(s);
  if (d < min || d > max) {
    console.log(`out of bounds year ${s}`);
    return false;
  }
  return true;
}
