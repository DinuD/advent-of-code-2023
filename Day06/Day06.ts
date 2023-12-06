import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const computeDistance = (holdDownTime: number, totalTime: number): number => {
    if(holdDownTime === 0)
        return 0;
    return holdDownTime * (totalTime - holdDownTime);
}

function part1(input: string[]): number {
    const time = input[0]
        .replaceAll(/\s{2,}/g, " ")
        .replace(/Time:\s*/g, "")
        .split(" ")
        .map(Number);
    const distances = input[1]
        .replaceAll(/\s{2,}/g, " ")
        .replace(/Distance:\s*/g, "")
        .split(" ")
        .map(Number);
    let error = 1
    for(let i = 0; i < time.length; i++) {
        let ways = 0;
        for(let j = 0; j <= time[i]; j++) {
            const distance = computeDistance(j, time[i]);
            if(distance > distances[i]) {
                ways++
            }
        }
        if(ways)
            error *= ways;
    }
    return error;
}

function part2(input: string[]): number {
    const time = parseInt(input[0]
        .replaceAll(/\s/g, "")
        .replace(/Time:/g, ""))
    const distance = parseInt(input[1]
        .replaceAll(/\s/g, "")
        .replace(/Distance:/g, ""))
    let ways = 0;
    for (let i = 0; i <= time; i++) {
        const d = computeDistance(i, time);
        if (d > distance) {
            ways++;
        }
    }
    return ways;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 288);
console.log(part1(input));
assertEquals(part2(example), 71503);
console.log(part2(input));