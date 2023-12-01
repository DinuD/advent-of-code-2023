import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let sum = 0;
    input.forEach(calibration => {
        const match = calibration.matchAll(/(\d)/g);
        const numbers = [...match].map(m => parseInt(m[0]));
        sum += numbers[0] * 10 + numbers[numbers.length - 1];
    })
    return sum;
}

const numberMap = new Map<string, number>([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9]
]);

function part2(input: string[]): number {
    let sum = 0;
    input.forEach((calibration) => {
        const match = calibration.matchAll(/(\d)/g);
        const numbers = [...match].map((m) => parseInt(m[0]));
        let numbersSpelled: string[] = [];
        for(let i = 0; i < calibration.length; i++) {
            const matchLetters = calibration.slice(i).matchAll(/(one|two|three|four|five|six|seven|eight|nine)/g);
            numbersSpelled = numbersSpelled.concat([...matchLetters].map(m => m[0]));
        }
        let first: number;
        let last: number;

        if(numbers.length === 0) {
            first = numberMap.get(numbersSpelled[0])!;
            last = numberMap.get(numbersSpelled[numbersSpelled.length - 1])!;
        } else if(numbersSpelled.length === 0) {
            first = numbers[0];
            last = numbers[numbers.length - 1];
        } else {
            // check if first number is spelled out or not
            calibration.indexOf(numbersSpelled[0]) <
            calibration.indexOf(numbers[0].toString())
                ? (first = numberMap.get(numbersSpelled[0])!)
                : (first = numbers[0]);
    
            // check if last number is spelled out or not
            calibration.lastIndexOf(numbersSpelled[numbersSpelled.length - 1]) >
            calibration.lastIndexOf(numbers[numbers.length - 1].toString())
                ? (last = numberMap.get(numbersSpelled[numbersSpelled.length - 1])!)
                : (last = numbers[numbers.length - 1]);
        }
        sum += first * 10 + last;
    });
    return sum;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 142);
console.log(part1(input));
console.log(part2(input));