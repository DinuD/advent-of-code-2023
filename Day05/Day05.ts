import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    // this one uses inclusive end
    const seeds = input[0].split(": ")[1].split(" ").map(Number)
    const seedMap = new Map<number, number>(seeds.map(seed => [seed, seed]))
    let i = 3
    while(i < input.length) {
        const tempMap = new Map<number, number>()
        while(i < input.length && input[i] != '') {
            const [destStart, sourceStart, range] = input[i].split(" ").map(Number)
            for(const [k, v] of seedMap.entries()) {
                if(v >= sourceStart && v < sourceStart + range) {
                    tempMap.set(k, destStart + (v - sourceStart))
                }
            }
            i++
        }
        for(const [k, v] of tempMap.entries()) {
            seedMap.set(k, v)
        }
        i += 2
    }
    return Math.min(...seedMap.values());
}

function part2(input: string[]): number {
    // const seedRanges = input[0].split(": ")[1].split(" ").map(Number)
    // const seeds: number[] = []
    // for(let i = 0; i < seedRanges.length-1; i += 2) {
    //     for(let j = 0; j < seedRanges[i+1]; j++) {
    //         seeds.push(seedRanges[i] + j)
    //         console.log(seedRanges[i]+j, seeds.length)
    //     }
    // }
    // const seedMap = new Map<number, number>(seeds.map(seed => [seed, seed]))
    // let i = 3
    // while(i < input.length) {
    //     const tempMap = new Map<number, number>()
    //     while(i < input.length && input[i] != '') {
    //         const [destStart, sourceStart, range] = input[i].split(" ").map(Number)
    //         for(const [k, v] of seedMap.entries()) {
    //             if(v >= sourceStart && v < sourceStart + range) {
    //                 tempMap.set(k, destStart + (v - sourceStart))
    //             }
    //         }
    //         i++
    //     }
    //     for(const [k, v] of tempMap.entries()) {
    //         seedMap.set(k, v)
    //     }
    //     i += 2
    // }
    // return Math.min(...seedMap.values());

    const rangesOverlap = (a: [number, number], b: [number, number]) => {
        // return the overlapping range
        return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
    }

    const seedNumbers = input[0].split(": ")[1].split(" ").map(Number)
    let ranges: number[][] = []
    for(let i = 0; i < seedNumbers.length-1; i += 2) {
        // use exclusive end
        ranges.push([seedNumbers[i], seedNumbers[i] + seedNumbers[i+1]])
    }

    let i = 3;
    while (i < input.length) {
        const newRanges: number[][] = [];
        while (i < input.length && input[i] !== "") {
            const [destStart, sourceStart, range] = input[i]
                .split(" ")
                .map(Number);
            for (const [start, end] of ranges) {
                const overlap = rangesOverlap([start, end], [sourceStart, sourceStart + range])
                const before = [start, Math.min(end, sourceStart)]
                const after = [Math.max(start, sourceStart + range), end]
                if(before[1] > before[0]) {
                    newRanges.push(before)
                }
                if(after[1] > after[0]) {
                    newRanges.push(after)
                }
                if(overlap[1] > overlap[0]) {
                    newRanges.push([destStart + (overlap[0] - sourceStart), destStart + (overlap[1] - sourceStart)])
                }
            }
            i++;
        }
        ranges = newRanges
        i += 2;
    }
    console.log(ranges)
    return ranges.reduce((min, [a, b]) => Math.min(min, a, b), Infinity)
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 35);
console.log(part1(input));
assertEquals(part2(example), 46);
console.log(part2(input));