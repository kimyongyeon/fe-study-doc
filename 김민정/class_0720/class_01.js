// npm install -g nodemon 
// console.log("hihihi");

// 연관데이터를 묶는 컨테이너
// class personTest {
//     name; // 프로퍼티 속성 (field)
//     age;  // 프로퍼티 속성 (field)
//     speake() // 행동 (method)
// }

// 사물과 물체를 class로 정의해서 만든다
// class 에 이런이런 데이터가 들어온다고 정의한 틀

// class(템플릿 틀 클래스 자체는 데이터가 없음) -- 붕어빵 찍어낸는 틀
// object(실제 데이터를 넣어서 만드는것) -- 팥붕어빵, 크림붕어빵

// 프로토타입 기반으로 ES6 버젼에서 추가됨 class 문법 추가됨

// 1. class declarations 클래스 선언
class Person {
    // constructor 생성자에 오브젝트 만들때 필요한 데이터를 전달
    constructor(name, age) {
        // fields
        this.name = name; // 할당
        this.age = age;
    }
    
    // methods
    speak() {
        console.log(`${this.name}:Hello!`);
    }
}

// 새로운 오브젝트 생성 new 클래스명
const ellie = new Person(`ellie`,20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();


