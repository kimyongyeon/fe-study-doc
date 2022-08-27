# 자바스크립트에서의 클래스

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log("생성되었습니다.");
  }
}

let cheolsu = new Person("cheolsu", 20);
```

자바스크립트는 프로토타입을 이용해서 상속을 구현했다.

```javascript
let user = { name: "cheolsu", age: 20 };
let singer = { name: "eunwoo", age: 25, genre: "K-POP" };
```

위 두 객체를 생각해보자. `name` 프로퍼티와 `age` 프로퍼티가 중복된다.
