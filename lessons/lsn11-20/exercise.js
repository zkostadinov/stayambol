class Human {
    constructor(first, last='', birthday, gender) {
        this.name = {
            first, last
        }
        this.birthday = birthday;
        this.gender = gender;
    }

    age() {
        let distanceInMillis = new Date() - this.birthday;
        let millisInYear = 365*24*60*60*1000;
        return Math.floor(distanceInMillis / millisInYear);
    }

    describe() {
        return this.name.first + ' ' + this.name.last + ' (' + this.age() + ' years old)';
    }
}

var zlatko = new Human('zlatko', 'kostadinov', new Date(1980, 1, 18));
alert(zlatko.describe());
