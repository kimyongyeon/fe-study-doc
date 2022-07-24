// nodemon class_02.js
// 프로퍼티 수정하면 안될때 프라이빗하게 만들기 - 인캡슐레이션

// Getter and Setters
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    // getter 정의하는 순간 this.age 메모리데이터가 아닌--> getter 호출
    get age() {
        return this._age;            
    }
    // = age; 전달된 값을 할당할때 메모리 할당이 아닌 --> setter 호출
    set age(value) {
        // if (value < 0) {
        //     throw Error('age can not be negative');
        // }
        // this._age = value;
        this._age = value < 0 ? 0 : value;
    }
    // get, set 안에 변수명 수정
    // class User 안에는 총 3개의 field -- this.firstName, this.lastName, this._age
}

const user1 = new User('Steve', 'Job', -1);
console.log(user1.age); // 사람은 -1살은 말이 안됨


