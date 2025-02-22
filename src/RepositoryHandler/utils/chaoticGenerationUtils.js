export function chaoticNumber(seed = 0) {
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

export function chaoticInt(excludedMax, seed = 0) {
    return Math.floor(chaoticNumber(seed) * excludedMax);
}

export function chaoticSelect(arr, seed = 0) {
    return arr[chaoticInt(arr.length, seed)];
}

export function chaoticObject(
    optionsForFields,
    seed = 0,
    transform
){
    const obj = {};
    Object.keys(optionsForFields).forEach((field) => {
        obj[field] = chaoticSelect(optionsForFields[field], seed++);
    });
    transform;
    return obj;
}

export function chaoticObjects(
    optionsForFields,
    numberToMake,
    seed = 0,
    objectTransform
)  {
    return Array.from(new Array(numberToMake), (_el, idx) => {
        return chaoticObject(optionsForFields, seed + idx, objectTransform);
    });
}
