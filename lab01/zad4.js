const processQueue = async (tasks, maxConcurrent) => {
    let tasksRunning = 0;
    let i = 0;
    const len = tasks.length
    const results = []

    return new Promise(res => {
        const run = () => {
            if (results.length == len){
                return res(results)
            }

            while (tasksRunning < maxConcurrent && i < tasks.length){
                const task = tasks[i]
                i+=1
                tasksRunning+=1
                console.log(`Running task ${i}`);
                
                task()
                    .then(val => {
                        results.push(val)
                        tasksRunning-=1
                        console.log(`Task ${i} finished`)
                        run()
                    })
            }
        }

        run()
    })
}

const task1 = async () => {
    return await new Promise((res,rej) => {
        setTimeout(() => {
            res("task1")
        }, 3000);
    })
}

const task2 = async () => {
    return await new Promise((res,rej) => {
        setTimeout(() => {
            res("task2")
        }, 5000);
    })
}
const task3 = async () => {
    return await new Promise((res,rej) => {
        setTimeout(() => {
            res("task3")
        }, 4000);
    })
}

const tasks = [task1,task2,task3]

processQueue(tasks,2)
    .then(res => console.log(res))
    .catch(err => console.err("Something went wrong: ", err))