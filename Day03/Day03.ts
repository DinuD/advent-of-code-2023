import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function isNumber(value: string): boolean {
    return !isNaN(parseInt(value));
}

const getSymbols = (match: RegExpMatchArray[]): number[] => {
    const symbols: number[] = [];
    for(const m of match) {
        if(!isNumber(m[0])) {
            symbols.push(m.index!)
        }
    }
    return symbols;
};

function part1(input: string[]): number {
    const matches = input.map((line) => [
        ...line.matchAll(/(\d+|[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?])/g),
    ]);
    let sum = 0
    matches.forEach((match, i) => {
        for(const m of match) {
            if(isNumber(m[0])) {
                let toInclude = false
                const start = m.index!
                const end = start + m[0].length-1

                if(i > 0) {
                    const symbols = getSymbols(matches[i-1])
                    for(const s of symbols) {
                        if(s >= start-1 && s <= end+1) {
                            toInclude = true
                        }
                    }
                }

                if(i < matches.length-1) {
                    const symbols = getSymbols(matches[i+1])
                    for(const s of symbols) {
                        if(s >= start-1 && s <= end+1) {
                            toInclude = true
                        }
                    }
                }

                const symbols = getSymbols(match)
                for(const s of symbols) {
                    if(s == start-1 || s == end+1) {
                        toInclude = true
                    }
                }
                // console.log(m, toInclude)
                if(toInclude)
                    sum += parseInt(m[0])
            }
        }
    })
    return sum;
}

function part2(input: string[]): number {
    const matches = input.map((line) => [
        ...line.matchAll(/(\d+|\*)/g),
    ]);
    let sum = 0;
    matches.forEach((match, index) => {
        for (const m of match) {
            if (!isNumber(m[0])) {
                const numbers: number[] = [];
                for(const i of [index-1, index, index+1]) {
                    if(i < 0 || i >= matches.length) {
                        continue
                    }
                    for(const p of matches[i]) {
                        if(isNumber(p[0])) {
                            const start = p.index!
                            const end = start + p[0].length-1
                            if(start <= m.index! && end >= m.index!) {
                                numbers.push(parseInt(p[0]))
                            } else if (start === m.index!+1) {
                                numbers.push(parseInt(p[0]))
                            } else if (end === m.index!-1) {
                                numbers.push(parseInt(p[0]))
                            }
                        }
                    }
                }
                if(numbers.length === 2) {
                    sum += numbers[0] * numbers[1]
                }
            }
        }
    });
    return sum;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 925);
console.log(part1(input));
assertEquals(part2(example), 6756);
console.log(part2(input));