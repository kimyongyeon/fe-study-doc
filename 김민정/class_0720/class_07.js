// nodemon class_07.js
// 공통사항 shape 재사용
// 5. 상속과 다양성 -- extends 이용하여 도형의 공통사항을 정의해서 재사용

class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        console.log(`drawing ${this.color} color of`);
    }
    getArea() {
        return this.width * this.height;
    }
}

class Rectangle extends Shape {} // Shape에 있는 모든것들이 Rectangle에 포함됨

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());

class Triangle extends Shape {
    // 필요한 함수들만 재정의 : 오버라이드
    draw() {
        super.draw(); // super.부모메서드명() : 공통적으로 정의 된 부모메서드 호출
        console.log(`삼각형`); 
    }
    getArea() {
        return (this.width * this.height) / 2;
    }
    toString() {
        return `Triangle: color : ${this.color}`;
    }
} 
const triangle = new Triangle(10, 20, 'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instance of
// 왼쪽 오브젝트가 오른쪽의 클래스의 인스턴스인지 아닌지 확인
// 오브젝트가 해당 클래스를 이용해서 만든건지 아닌지 확인

console.log(rectangle instanceof Rectangle);  // true
console.log(triangle instanceof Rectangle);   // false
console.log(triangle instanceof Triangle);    // true
console.log(triangle instanceof Shape);       // Shape 상속 -- true
console.log(triangle instanceof Object);      
// 자바스크립트 만든 모든 오브젝트 class들은 자바스크립트 Object 상속함

console.log(triangle.toString()); // [object Object]

// Javascript reference -- 자바스크립트 내부 Object들 한번 읽어 보기
// this 바인딩 클로져
