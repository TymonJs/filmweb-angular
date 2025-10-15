enum Status {
    active = "active",
    inactive = "inactive"
}

function processData(name: string, age: number, isActive: boolean, scores: number[], status: Status): void {
    console.log(`Name: ${name}, Status: ${status} `);

    if (age >= 18){
        console.log("Adult");
    }
    else{
        console.log("Minor");
    }

    const avg = scores.reduce((acc,c) => acc+c,0)

    console.log(`Average Score: ${avg}`);
    
}

processData("Marcin", 18, true, [3,6,10], Status.active)
