/*
Returns a seemingly random float value between 0 (inclusive) and 1 (exclusive).
The returned number will always be the same based on the seed provided.
*/
export function chaoticNumber(seed = 0): number {
    // no particular algorithm, just something *really* hard to predict
    // but it's repeatable since it's just a math equation
    const trigMess =
        Math.sin(1 + seed * seed * seed) +
        Math.cos(2 + seed * seed * 5) +
        Math.sin(3 + seed * 13) +
        Math.cos(4 + seed * 17);
    // shift the range from -4 to 4 upward to become 0 to 8
    // select only the decimal to avoid biases toward the middle of the 0-8 range
    // results in a value between 0 and 1
    const adjustedTrigMess = (trigMess + 4) % 1;
    return adjustedTrigMess;
}

/*
Returns a seemingly random integer between 0 (inclusive) and excludedMax (exclusive).
The returned integer will always be the same based on the seed provided.
*/
export function chaoticInt(excludedMax: number, seed = 0): number {
    return Math.floor(chaoticNumber(seed) * excludedMax);
}

/*
Returns a seemingly random element from an array.
The returned element will always be the same based on the seed provided.
*/
export function chaoticSelect<T>(arr: T[], seed = 0): T {
    return arr[chaoticInt(arr.length, seed)];
}

/*
Returns an object with the same fields as optionsForFields, but with the values
replaced by a seemingly randomly selected element in the matching field's array.
The object will always be the same based on the seed provided.

If a transformer function is provided, it applies to the object after it is made.
*/
export function chaoticObject<T>(
    optionsForFields: { [field: string]: any[] },
    seed = 0,
    transform?: (x: T) => void
): T {
    const obj = {};
    Object.keys(optionsForFields).forEach((field) => {
        obj[field] = chaoticSelect(optionsForFields[field], seed++);
    });
    transform && transform(obj as T);
    return obj as T;
}

/*
Returns an array of objects with the same fields as optionsForFields, but with the values
replaced by a seemingly randomly selected element in the matching field's array.
The objects will always be the same based on the seed provided.

If a transformer function is provided, it applies to each object after it is made.
*/
export function chaoticObjects<T>(
    optionsForFields: { [field: string]: any[] },
    numberToMake: number,
    seed = 0,
    objectTransform?: (x: T) => void
): T[] {
    return Array.from(new Array(numberToMake), (_el, idx) => {
        return chaoticObject(optionsForFields, seed + idx, objectTransform);
    });
}
