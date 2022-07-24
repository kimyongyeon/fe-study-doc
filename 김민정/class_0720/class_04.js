// nodemon class_04.js
// 3.Fields (public, private)
// Too soon! 최신 브라우져는 지원하지 않음
// 생성자 constructor를 정의 하지 않고 Fields 정의

class Experiment {
    publicField = 2;
    #privateField = 0;  // 클래스 내부에서만 접근변경가능
}

const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);
// privateField 클래스 외부에서는 접근 변경 불가능