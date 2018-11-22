class Human {
    constructor(firstName, lastName, dob, teethCount=32) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.teethCount = teethCount;
    }

    age() {
        ///adsfads
        let now = new Date();
        let diff = now - this.dob;
        let millisecondInYear = (365*24 + 6)*60*60*1000;
        return Math.floor(diff / millisecondInYear);
    }

    describe() {
        return this.firstName + ' ' + this.lastName + ' (age of '+this.age()+')';
    }
}

class Student extends Human {
    constructor(firstName, lastName, dob, teethCount, numberInClass) {
        super(firstName, lastName, dob, teethCount);
        this.numberInClass = numberInClass;
    }

    describe() {
        return super.describe() + ' [ ' +this.numberInClass+ ' ]';
    }
}

var zlatko = new Human('zlatko', 'kostadinov', new Date(1980, 4, 5), 31);
var pe60 = new Student('pe60', '', new Date(1991, 4, 5), 32, 6);
console.log(zlatko.describe());
console.log(pe60.describe());
