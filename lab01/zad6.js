class User {
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    getDetails(){
        return {name: this.name, email: this.email};
    }
}

class Admin extends User {
    constructor(name,email,permissions){
        super(name,email);
        this.permissions = permissions;
    }
    getDetails(){
        return {...super.getDetails(),permissions: this.permissions}
    }
}

class Guest extends User {
    constructor(name,email){
        super(name,email);
    }
    getDetails(){
        return [this.name,this.email]
    }
}

const printUserDetails = (obj) => console.log(obj.getDetails());

u = new User("adam", "adddam")
a = new Admin("darek","daaarek",["d","a","r"])
g = new Guest("kamil","kaaamil")

printUserDetails(u)
printUserDetails(a)
printUserDetails(g)
