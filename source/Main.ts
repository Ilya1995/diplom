interface IUser {
    name: string;
}

class User {
    name: string;
    constructor(userName: string) {
        this.name = userName;
    }
}

class Employee extends User {
    company: string;
    constructor(employeeCompany: string, userName: string) {
        super(userName);
        this.company = employeeCompany;
    }
}

class Employee2 {
    company: string;
    userName: string;
    constructor(employeeCompany: string, userName: string) {
        this.company = employeeCompany;
        this.userName = userName;
    }
}

function getUserName(user: IUser): string {
    return user.name;
}

let alice: User = new Employee("Microsoft", "Alice");
console.log(getUserName(alice));

console.log(getUserName({ name: "Tom" }));
console.log(getUserName({ name: "Bob", company:"Microsoft" } as User));

let porg: Employee2 = new Employee2("Microsoft", "Porg");
if (porg instanceof User) {
    console.log("Porg is a User");
}
else {
    console.log("Porg is not a User");
}