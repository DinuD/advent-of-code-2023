import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

type Node = {
    left: string
    right: string
}

function part1(input: string[]): number {
    const instructions = input[0].split("")
    const map = new Map<string, Node>()
    for(let i = 2; i < input.length; i++) {
        const match = input[i].matchAll(
            /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g
        )
        const node = match.next().value
        const directions: Node = {left: node[2], right: node[3]}
        map.set(node[1], directions)
    }
    let steps = 0
    let currNode = "AAA"
    while(currNode !== "ZZZ") {
        for(const inst of instructions) {
            const directions = map.get(currNode)!
            if(inst === "L") {
                currNode = directions.left
            } else {
                currNode = directions.right
            }
            steps++
        }
    }
    return steps;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

function lcmOfArray(numbers: number[]): number {
    return numbers.reduce((a, b) => lcm(a, b));
}

function part2(input: string[]): number {
    const instructions = input[0].split("");
    const map = new Map<string, Node>();
    for (let i = 2; i < input.length; i++) {
        const match = input[i].matchAll(
            /(\w{3}) = \((\w{3}), (\w{3})\)/g
        );
        const node = match.next().value;
        const directions: Node = { left: node[2], right: node[3] };
        map.set(node[1], directions);
    }
    const currNode = [...map.keys()].filter(node => node[2] === "A");
    let steps = 0;
    const stepsPerNode: number[] = []
    while (currNode.some(node => node[2] !== "Z")) {
        for (const inst of instructions) {
            for(let i = 0; i < currNode.length; i++) {
                if(currNode[i][2] === "Z")
                    stepsPerNode.push(steps)
                const directions = map.get(currNode[i])!;
                if (inst === "L") {
                    currNode[i] = directions.left;
                } else {
                    currNode[i] = directions.right;
                }
            }
            steps++;
        }
        if(stepsPerNode.length === currNode.length)
            return lcmOfArray(stepsPerNode)
    }
    return 0;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

// assertEquals(part1(example), 6);
console.log(part1(input));
assertEquals(part2(example), 6);
console.log(part2(input));