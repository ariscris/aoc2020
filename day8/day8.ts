import * as fs from 'fs';

console.log(`sample: ${calc(load('./sample.txt'))}`)
console.log(`input: ${calc(load('./input.txt'))}`)

function load(fileName: string): Array<{ command: string, delta: number }> {
  const commands = new Array<{ command: string, delta: number }>();
  const data = fs.readFileSync(fileName, 'utf-8').split(/\n/);
  data.forEach(s => {
    const parts = s.split(' ');
    commands.push({
      command: parts[0],
      delta: Number.parseInt(parts[1])
    });
  });

  return commands;
}

function calc(commands: Array<{ command: string, delta: number }>) {
  const visited = new Set<number>();
  let currPos = 0;
  let total = 0;
  while (!visited.has(currPos)) {
    const {command, delta} = commands[currPos];
    visited.add(currPos);
    switch(command) {
      case 'acc': total = total + delta;
      case 'nop': currPos = currPos + 1; break;
      case 'jmp': currPos = currPos + delta; break;
    }
  }

  return total;
}

