import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const generatePrediction = (history: number[], backwards=false): number => {
    const sequence: number[] = []
    for(let i = 0; i < history.length-1; i++) {
        sequence.push(history[i+1] - history[i])
    }
    if(sequence.some(value => value !== 0)) {
        return backwards ? history[0] - generatePrediction(sequence, backwards) : history.slice(-1)[0] + generatePrediction(sequence, backwards)
    }
    return backwards ? history[0] : history.slice(-1)[0]
}

function part1(input: string[]): number {
    let sum = 0
    input.forEach(reading => {
        const history = reading.split(" ").map(Number)
        sum += generatePrediction(history)
    })
    return sum;
}

function part2(input: string[]): number {
    let sum = 0
    input.forEach(reading => {
        const history = reading.split(" ").map(Number)
        sum += generatePrediction(history, true)
    })
    return sum
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 114);
console.log(part1(input));
assertEquals(part2(example), 2);
console.log(part2(input));