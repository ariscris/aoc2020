import * as fs from 'fs';

calc('./sample.txt');
calc('./sample2.txt');
calc('./input.txt');

function calc(fileName: string) {
  const { innerMap, outerMap } = parse(fileName);
  const shinyGoldOuters = innerMap.get('shiny gold');
  if (shinyGoldOuters) {
    const possibleOuters = new Set<string>();
    traverse(shinyGoldOuters, innerMap, possibleOuters);
    console.log(possibleOuters.size);
  }

  console.log(`inner bag count = ${count('shiny gold', outerMap) - 1}`);
}

function count(rootColor: string, outerMap: Map<string, Map<string, number>>) {
  let total = 1;

  if (outerMap.has(rootColor)) {
      for (let [color, freq] of outerMap.get(rootColor)) {
        total = total + (count(color, outerMap) * freq);
        console.log({color, freq, total})
      }
  }

  return total;
}

function traverse(outers: Array<string>, innerMap: Map<string, Array<string>>, possibleOuters: Set<string>) {
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
  const outerMap = new Map<string, Map<string, number>>();
  data.forEach(s => {
    const parts = s.split (' contain ');
    if (parts.length === 2) {
      const outerBag = grabColor(parts[0]);
      const innerBags = parts[1].split(', ').map(grabFreqList);
      for (let bagFreq of innerBags) {
        if (bagFreq) {
          for (let [color, freq] of bagFreq) {
            innerMap.set(color, innerMap.has(color)? innerMap.get(color).concat(outerBag) : [ outerBag ]);
            if (outerMap.has(outerBag)) {
              outerMap.set(outerBag, outerMap.get(outerBag).set(color, freq));
            } else {
              outerMap.set(outerBag, bagFreq);
            }
          }
        }
      }
    }
  })

  innerMap.set('no other', []);
  console.log({ innerMap, outerMap });

  return { innerMap, outerMap };
}

function grabColor(s: string) {
  s = s.trim();
  s = s.replace(/\d /, '');
  s = s.replace('.', '');
  s = s.replace(' bags', '');
  s = s.replace(' bag', '');

  return s;
}

function grabFreqList(s: string): Map<string, number> {
  s = s.trim();
  s = s.replace('.', '');
  if (s === 'no other bags') {
    return;
  }

  s = s.replace(' bags', '');
  s = s.replace(' bag', '');

  const pos = s.indexOf(' ');
  const map = new Map<string, number>();
  map.set(s.substr(pos + 1), Number.parseInt(s.substr(0, pos + 1)));
  return map;
}