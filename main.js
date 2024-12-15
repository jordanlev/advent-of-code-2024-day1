"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function main(inputFilePath) {
    if (!fs.existsSync(inputFilePath)) {
        throw new Error(`Input file '${inputFilePath}' not found`);
    }
    let input = fs.readFileSync(inputFilePath, { encoding: 'utf8' });
    const [list1, list2] = parseInputIntoTwoLists(input);
    list1.sort();
    list2.sort();
    const combinedList = list1.map((_, i) => [list1[i], list2[i]]);
    const difference = combinedList.reduce((acc, cur) => acc + Math.abs(cur[0] - cur[1]), 0);
    console.info(difference);
}
function parseInputIntoTwoLists(input) {
    const normalizedNewlineInput = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const pairs = normalizedNewlineInput.split('\n');
    const list1 = [];
    const list2 = [];
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
function validateInputPair(match, lineNumber) {
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
}
catch (error) {
    console.error('FAILED: ', error.message);
}
