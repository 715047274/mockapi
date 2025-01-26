import { ObjectId } from 'bson';

export type IdLabelType = {
    id: number;
    label: string;
};

function getRandomNumberFromRange(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}

export function getRandomDecimalFromRange(
    min: number,
    max: number,
    fractionDigits = 4
): number {
    return toFixed(getRandomNumberFromRange(min, max), fractionDigits);
}

export function toFixed(val: number, fractionDigits = 4): number {
    return parseFloat(val.toFixed(fractionDigits));
}

export function getRandomIntFromRange(min: number, max: number): number {
    const val = getRandomNumberFromRange(min, max);
    return Math.floor(val);
}

export function getRandomIntFromOneToMax(max: number): number {
    return getRandomIntFromRange(1, max);
}

export function getRandomIndex(max: number): number {
    return getRandomIntFromRange(0, max - 1);
}

export function getRandomNumberFromSource(src: Array<number>): number {
    const id = getRandomIndex(src.length);
    return src[id];
}

export function getRandomStringFromSource(src: Array<string>): string {
    const id = getRandomIndex(src.length);
    return src[id];
}

export function createBsonObjectIdArray(total: number): Array<ObjectId> {
    return Array(total)
        .fill(null)
        .map(() => new ObjectId());
}

export function createIntArrayFromOne(max: number): Array<number> {
    return Array(max)
        .fill(0)
        .map((_, idx) => idx + 1);
}

export function createIntIdArray(from: number, to: number): Array<number> {
    return Array(to - from + 1)
        .fill(0)
        .map((_, idx) => from + idx);
}

export function createStringArray(
    from: number,
    to: number,
    prefix = '#'
): Array<string> {
    return Array(to - from + 1)
        .fill(0)
        .map((_, idx) => `${prefix}${from + idx}`);
}
