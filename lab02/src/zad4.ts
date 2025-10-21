
function mergeArrays<T>(arr: T[], arr2: T[]): T[]{
    return [...arr, ...arr2]
}


console.log(mergeArrays([1,2,3],[4,5,6]));

