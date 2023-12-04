import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let sum = 0;
    input.forEach((line) => {
        const [winningNumbers, ownNumbers] = line
            .replace(/Card\s+\d+:\s+/g, "")
            .split(" | ")
            .map((s) => s.replaceAll("  ", " ").split(" ").map(Number));
        let points = 0;
        for (const num of ownNumbers) {
            if (!winningNumbers.includes(num)) {
                continue;
            }
            if (points === 0) {
                points = 1;
            } else {
                points *= 2;
            }
        }
        sum += points;
    });
    return sum;
}

function part2(input: string[]): number {
    const cardsMap = new Map<number, number>();
    for (let i = 1; i <= input.length; i++) cardsMap.set(i, 1);
    input.forEach((line, index) => {
        const [winningNumbers, ownNumbers] = line
            .replace(/Card\s+\d+:\s+/g, "")
            .split(" | ")
            .map((s) => s.replaceAll("  ", " ").split(" ").map(Number));
        let points = 0;
        for (const num of ownNumbers) {
            if (!winningNumbers.includes(num)) {
                continue;
            }
            points++;
        }
        for (let i = index + 2; i < index + 2 + points; i++) {
            cardsMap.set(i, cardsMap.get(i)! + cardsMap.get(index + 1)!);
        }
    });
    // return total number of cards
    return [...cardsMap.values()].reduce((a, b) => a + b);
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 13);
console.log(part1(input));
assertEquals(part2(example), 30);
console.log(part2(input));
