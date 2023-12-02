import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    const maxMap = new Map<string, number>([
        ["red", 12],
        ["green", 13],
        ["blue", 14]
    ])
    let sum = 0
    input.forEach((line, i) => {
        const subsets = line.split("; ")
        let possible = true
        subsets.forEach(subset => {
            const match = subset.matchAll(/(\d+ green|\d+ red|\d+ blue)/g)
            const cubesPerColor = [...match].map(m => m[0])
            cubesPerColor.forEach(color => {
                const [count, colorName] = color.split(" ")
                if(parseInt(count) > maxMap.get(colorName)!) {
                    possible = false
                }
            })
        })
        if(possible) {
            sum += i+1
        }
    })
    return sum;
}

function part2(input: string[]): number {
    let totalPower = 0
    input.forEach(line => {
        const maxMap = new Map<string, number>([
            ["red", 0],
            ["green", 0],
            ["blue", 0]
        ])
        const subsets = line.split("; ")
        subsets.forEach((subset) => {
            const match = subset.matchAll(/(\d+ green|\d+ red|\d+ blue)/g)
            const cubesPerColor = [...match].map((m) => m[0])
            cubesPerColor.forEach((color) => {
                const [count, colorName] = color.split(" ")
                if (parseInt(count) > maxMap.get(colorName)!) {
                    maxMap.set(colorName, parseInt(count))
                }
            })
        })
        let power = 1
        maxMap.forEach((value) => {
            power *= value
        })
        totalPower += power
    })
    return totalPower
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 8);
console.log(part1(input));
assertEquals(part2(example), 2286);
console.log(part2(input));