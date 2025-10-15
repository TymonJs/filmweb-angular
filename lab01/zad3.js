const transformData = (objs,cb) => {
    return objs
        .filter(obj => obj.status==="completed")
        .map(obj => cb(obj))
        .reduce(
            (acc,c) => acc + c.amount
        ,0)

}

const obj1 = {
    id: 1,
    amount: 200,
    status: "pending"
}
const obj2 = {
    id: 2,
    amount: 50,
    status: "completed"
}
const obj3 = {
    id: 3,
    amount: 75,
    status: "completed"
}
const obj4 = {
    id: 4,
    amount: 150,
    status: "canceled"
}

const objs = [obj1,obj2,obj3,obj4]

const cb = (obj) => {
    obj.amount *= 2
    return obj
}
const res = transformData(objs,cb)

console.log(res)
