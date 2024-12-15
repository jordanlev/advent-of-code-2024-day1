import * as fs from 'fs';
import * as path from 'path';

function main(inputFilePath: string) {
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`Input file '${inputFilePath}' not found`)
  }

  let input: string = fs.readFileSync(inputFilePath, { encoding: 'utf8' });

  const [list1, list2] = parseInputIntoTwoLists(input);

  list1.sort();
  list2.sort();

  const combinedList = list1.map((_, i) => [list1[i], list2[i]]);
  const difference = combinedList.reduce(
    (acc, cur) => acc + Math.abs(cur[0] - cur[1]),
    0
  );

  console.info(difference);
}

function parseInputIntoTwoLists(input: string) {
  const normalizedNewlineInput = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const pairs = normalizedNewlineInput.split('\n');
  
  const list1: number[] = [];
  const list2: number[] = [];
  pairs.forEach((pair, index) => {
    if (!pair) {
      return; // skip empty lines
    }
    const match = pair.match(/(\S+)\s+(\S+)/);
    const integerValues = validateInputPair(match, index + 1);
    list1.push(integerValues[0]);
    list2.push(integerValues[1]);
  });

  return [list1, list2];
}

function validateInputPair(match: RegExpMatchArray | null, lineNumber: number) {
  if (!match || match.length !== 3) {
    throw new Error(`Line ${lineNumber} of input file does not contain a pair of numbers separated by whitespace`);
  }
  const str1 = match[1];
  const str2 = match[2];

  const int1 = parseInt(str1, 10);
  const int2 = parseInt(str2, 10);
  if (isNaN(int1) || isNaN(int2)) {
    throw new Error(`Line ${lineNumber} of input file does not contain two integers`);
  }
  
  return [int1, int2];
}

const inputFileName = process.argv[2];
const inputFilePath = path.join(__dirname, inputFileName);
try {
  main(inputFilePath);
} catch (error: any) {
  console.error('FAILED: ', error.message);
}
