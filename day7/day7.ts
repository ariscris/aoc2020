import * as fs from 'fs';

calc('./sample.txt');
calc('./input.txt');

function calc(fileName: string) {
  const innerMap = parse(fileName);
  const shinyGoldOuters = innerMap.get('shiny gold');
  console.log({shinyGoldOuters})
  const possibleOuters = new Set<string>();
  traverse(shinyGoldOuters, innerMap, possibleOuters);
  console.log(possibleOuters.size);
}

function traverse(outers: Array<string>, innerMap: Map<string, Array<string>>, possibleOuters: Set<string>) {
  console.log(`traversing ${outers}`)
  for (let bag of outers) {
    if (!possibleOuters.has(bag)) {
      possibleOuters.add(bag);
      if (innerMap.has(bag))
        traverse(innerMap.get(bag), innerMap, possibleOuters);
    }
  }
}

function parse(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  const innerMap = new Map<string, Array<string>>();
  data.forEach(s => {
    const parts = s.split (' contain ');
    if (parts.length === 2) {
      const outerBag = grabColor(parts[0]);
      const innerBags = parts[1].split(', ').map(grabColor);
      for (let bag of innerBags) {
        innerMap.set(bag, innerMap.has(bag)? innerMap.get(bag).concat(outerBag) : [ outerBag ]);
      }
    }
  })

  innerMap.set('no other', []);
  console.log({innerMap});

  return innerMap;
}

function grabColor(s: string) {
  s = s.trim();
  s = s.replace(/\d /, '');
  s = s.replace('.', '');
  s = s.replace(' bags', '');
  s = s.replace(' bag', '');

  console.log(`'${s}'`);
  return s;
}