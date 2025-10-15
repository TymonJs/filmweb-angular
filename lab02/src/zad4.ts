
function mergeArrays<T>(arr: T[], arr2: T[]): T[]{
    
    // if (typeof arr !== typeof arr2) throw new Error("Arrays have to be the same type")

    return [...arr, ...arr2]
}


console.log(mergeArrays([1,2,3],[4,5,6]));

