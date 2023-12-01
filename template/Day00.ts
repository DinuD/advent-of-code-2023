import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): string {
    return "";
}

function part2(input: string[]): string {
    return "";
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), "");
console.log(part1(input));
console.log(part2(input));