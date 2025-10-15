class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number){
        this.name = name;
        this.salary =  salary;
    }

    public getDetails(): {name: string, salary: number} {
        return {
            name: this.name,
             salary: this.salary
        }
    }
}

class Manager extends Employee{
    public department: string;
    constructor(name: string, salary: number, department: string){
        super(name, salary);
        this.department = department;
    }

    public getDetails(): { name: string, salary: number, department: string} {
        return {
            ...super.getDetails(),
             department: this.department
        }
    }
}

class Developer extends Employee {
    public programmingLanguages: string[]
    constructor(name: string, salary: number, programmingLanguages: string[]){
        super(name,salary);
        this.programmingLanguages = programmingLanguages;
    }

    public getDetails(): { name: string, salary: number, programmingLanguages: string[]} {
        return {
            ...super.getDetails(),
            programmingLanguages: this.programmingLanguages
        }
    }
}

function printEmployeeDetails(emp: Employee): void{

    const details = emp.getDetails()

    console.log(details);
}


const dev = new Developer("Adam",10000, ["js","python"]);

printEmployeeDetails(dev);