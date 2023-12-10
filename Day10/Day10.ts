import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

type Position = {
    i: number,
    j: number
}

const northPipes = ["|", "7", "F"]
const southPipes = ["|", "L", "J"]
const eastPipes = ["-", "7", "J"]
const westPipes = ["-", "L", "F"]
const allowedDirections = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    "7": ["S", "W"],
    "F": ["S", "E"],
    "L": ["N", "E"],
    "J": ["N", "W"],
    "S": ["N", "S", "E", "W"],
    ".": []
} as {[key: string]: string[]}

const findConnected = (map: string[], i: number, j: number): Position[] => {
    const connected: Position[] = [];
    const current = map[i][j];
    if(i > 0 && northPipes.includes(map[i-1][j]) && allowedDirections[current].includes("N")) {
        connected.push({i: i-1, j});
    }
    if(i < map.length-1 && southPipes.includes(map[i+1][j]) && allowedDirections[current].includes("S")) {
        connected.push({i: i+1, j});
    }
    if(j < input[i].length-1 && eastPipes.includes(map[i][j+1]) && allowedDirections[current].includes("E")) {
        connected.push({i, j: j+1});
    }
    if(j > 0 && westPipes.includes(map[i][j-1]) && allowedDirections[current].includes("W")) {
        connected.push({i, j: j-1});
    }
    return connected
}

const posEqual = (pos1: Position, pos2: Position): boolean => {
    return pos1.i === pos2.i && pos1.j === pos2.j;
}

// const findLoop = (map: string[], path: Position[]): Position[] => {
//     const current = path[path.length-1];
//     if(path.length > 1 && posEqual(path[0], path[path.length-1])) {
//         return path;
//     }
//     const connected = findConnected(map, current.i, current.j);
//     for(const con of connected) {
//         if(!path.some(pos => posEqual(pos, con))) {
//             console.log(path)
//             const loop = findLoop(map, [...path, con]);
//             if(loop.length > 1) {
//                 return loop;
//             }
//         }
//     }
//     return [];
// }

function part1(input: string[]): number {
    const start = input.map((line, i) => ({i, j: line.indexOf("S")})).filter(pos => pos.j !== -1)[0] as Position;
    const dist: number[][] = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill(Infinity));
    dist[start.i][start.j] = 0;
    const queue = [start];

    while(queue.length > 0) {
        const pos = queue.shift() as Position;
        const connected = findConnected(input, pos.i, pos.j);
        for(const con of connected) {
            if(dist[con.i][con.j] === Infinity) {
                dist[con.i][con.j] = dist[pos.i][pos.j] + 1;
                queue.push(con);
            }
        }
    }

    // return max distance except for infinity
    return Math.max(...dist.map(line => Math.max(...line.filter(num => num !== Infinity))));
}

function part2(input: string[]): number {
    const start = input.map((line, i) => ({i, j: line.indexOf("S")})).filter(pos => pos.j !== -1)[0] as Position;
    const dist: number[][] = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill(Infinity));
    dist[start.i][start.j] = 0;
    const queue = [start];

    while(queue.length > 0) {
        const pos = queue.shift() as Position;
        const connected = findConnected(input, pos.i, pos.j);
        for(const con of connected) {
            if(dist[con.i][con.j] === Infinity) {
                dist[con.i][con.j] = dist[pos.i][pos.j] + 1;
                queue.push(con);
            }
        }
    }

    let inside = false
    let tiles = 0
    for(const line of dist) {
        console.log(line.map(value => value === Infinity ? "~" : value).join(" "))
        for(let i = 0; i < line.length; i++) {
            if(line[i] !== Infinity) {
                if(!inside) {
                    inside = true
                } else {
                    inside = false
                }
            } else {
                if(inside) {
                    tiles++
                }
            }
        }
    }

    return tiles;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

// assertEquals(part1(example), 8);
// assertEquals(part1(input), 7012);
assertEquals(part2(example), 8);
console.log(part2(input));