// nodemon class_05.js
// 4. Static properties and methods
// static을 사용해서 class 동일 반복 틀을 수정

class Article {
    static publisher = '자바스크립트 공부해!';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }
    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(Article.publisher);  // 자바스크립트 공부해! --> static함수는 class 자체에 연동됨
console.log(article1.publisher); // 오브젝트명.publisher --> undefined 값없음
Article.printPublisher();

// static함수는 오브젝트와 상관없이 들어오는 데이터에 상관없이
// 공통적으로 클래스에서 쓸수있다면 static, static()를 이용하여
// 메모리 사용을 줄일수 있다
