const processData = (objs) => {

    return objs.reduce((acc,c) => {

        if (c.active) acc.sum+=c.value
        acc.names = [...acc.names, c.name.split("").reverse().join("")]
        if (c.id>acc.maxid) acc.maxid = c.id
        if (c.name.split("").length>3) acc.values+=c.value
        
        return acc
    }
    ,{
        sum:0,
        names:[],
        maxid: objs[0].id,
        values: 0
    })
}


const obj1 = {
    id: 0,
    name: "Kamil",
    value: 5,
    active: true
}
const obj2 = {
    id: 1,
    name: "But",
    value: 100,
    active: true
}
const obj3 = {
    id: 2,
    name: "Żyrafa",
    value: 1,
    active: false
}
const obj4 = {
    id: 3,
    name: "Kajak",
    value: 300,
    active: true
}

const objs = [obj1,obj2,obj3,obj4]

const res = processData(objs);

console.dir(res)
