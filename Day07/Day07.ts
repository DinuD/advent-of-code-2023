import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

// HAND SCORES
// 0: High Card
// 1: One Pair
// 2: Two Pairs
// 3: Three of a Kind
// 4: Full House
// 5: Four of a Kind
// 6: Five of a Kind

const compareHands = (hand1: string, hand2: string, cardsByScore: string[], evalHand: (hand: string) => number): number => {
    if(evalHand(hand1) > evalHand(hand2))
        return 1
    if(evalHand(hand1) < evalHand(hand2))
        return -1
    for(let i = 0; i < hand1.length; i++) {
        if(cardsByScore.indexOf(hand1[i]) > cardsByScore.indexOf(hand2[i]))
            return -1
        if(cardsByScore.indexOf(hand1[i]) < cardsByScore.indexOf(hand2[i]))
            return 1
    }
    return 0
}

function part1(input: string[]): number {
    const evalHand = (hand: string): number => {
        const cardCount = new Map<string, number>();
        for (const card of hand) {
            if (cardCount.has(card)) {
                cardCount.set(card, cardCount.get(card)! + 1);
            } else {
                cardCount.set(card, 1);
            }
        }
        if (cardCount.size === 1) return 6;
        if (cardCount.size === 2) {
            for (const card of cardCount.keys()) {
                if (cardCount.get(card) === 4) return 5;
            }
            return 4;
        }
        if (cardCount.size === 3) {
            for (const card of cardCount.keys()) {
                if (cardCount.get(card) === 3) return 3;
            }
            return 2;
        }
        if (cardCount.size === 4) return 1;
        return 0;
    };
    
    const cardsByScore = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

    const bidMap = new Map<string, number>()
    let sum = 0
    input.forEach(line => {
        const [hand, bid] = line.split(" ")
        bidMap.set(hand, parseInt(bid))
    })
    const hands = Array.from(bidMap.keys())
    hands.sort((a, b) => compareHands(a, b, cardsByScore, evalHand))
    for(let i = 0; i < hands.length; i++) {
        sum += bidMap.get(hands[i])! * (i + 1)
    }
    return sum;
}

function part2(input: string[]): number {
    const getMaxKey = (map: Map<string, number>): string => {
        let max = 0
        let maxKey = ""
        for(const [key, value] of map.entries()) {
            if(value > max && key !== "J") {
                max = value
                maxKey = key
            }
        }
        return maxKey
    }

    const evalHand = (hand: string): number => {
        const cardCount = new Map<string, number>();
        for (const card of hand) {
            if (cardCount.has(card)) {
                cardCount.set(card, cardCount.get(card)! + 1);
            } else {
                cardCount.set(card, 1);
            }
        }
        const j = cardCount.get("J") || 0
        if (cardCount.size === 1) return 6;
        if (cardCount.size === 2) {
            for (const card of cardCount.keys()) {
                if (cardCount.get(card) === 4) return j === 0 ? 5 : 6;
            }
            if(j === 0) return 4
            // get the key with max count
            const maxKey = getMaxKey(cardCount)
            return evalHand(hand.replaceAll("J", maxKey))
        }
        if (cardCount.size === 3) {
            if(j) {
                const maxCard = getMaxKey(cardCount)
                return evalHand(hand.replaceAll("J", maxCard))
            }
            for (const card of cardCount.keys()) {
                if (cardCount.get(card) === 3) return 3;
            }
            return 2;
        }
        if (cardCount.size === 4) {
            if(j) {
                const maxCard = getMaxKey(cardCount)
                return evalHand(hand.replaceAll("J", maxCard))
            }
            return 1
        }
        if(j) return 1
        return 0;
    };

    const cardsByScore = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

    const bidMap = new Map<string, number>()
    let sum = 0
    input.forEach(line => {
        const [hand, bid] = line.split(" ")
        bidMap.set(hand, parseInt(bid))
    })
    const hands = Array.from(bidMap.keys())
    hands.sort((a, b) => compareHands(a, b, cardsByScore, evalHand))
    for(let i = 0; i < hands.length; i++) {
        sum += bidMap.get(hands[i])! * (i + 1)
    }
    return sum;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 6440);
console.log(part1(input));
assertEquals(part2(example), 5905);
console.log(part2(input));