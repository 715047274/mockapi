export const createPagingParameter = (skip, take, needTotal = true) => {
    return {
        skip,
        take,
        needTotal,
    };
}

export const getAlteredPageInfo = (addedEntries, skip, take) => {

    const addedEntriesToSkip = Math.min(addedEntries.length, skip);
    const addedEntriesToTake = Math.min(
        take,
        addedEntries.length - addedEntriesToSkip
    );
    const databaseEntriesToSkip = Math.max(0, skip - addedEntries.length);
    const databaseEntriesToTake = Math.max(0, take - addedEntriesToTake);

    return {
        addedEntriesToSkip,
        addedEntriesToTake,
        databaseEntriesToSkip,
        databaseEntriesToTake,
    };
}