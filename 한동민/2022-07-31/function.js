/*
    함수란?
    1. 자바스크립트의 핵심 개념인 스코프, 실행 컨텍스트, 클로저, 생성자 함수에 의한 객체 생성,
       메서드 this, 프로토타입, 모듈화 등과 같이 깊은 관련이 있 자바스크립트의 핵심
    2. 함수는 Input을 받아서 Output을 내보내는 일련의 과정을 정의한 것이다.
    3. 함수의 사용 이유는 코드의 중복을 제거하고 재사용할 수 있어서이다.
       3.1 재사용성을 높이는 함수는 유지보수의 편의성을 높이고 실수를 줄여 코드의 신뢰성을 높이는 효과가 있다.
       3.2 함수 이름은 변수 이름과 마찬가지로 함수 자신의 역할을 잘 설명해야 한다. ( 중요 ) 코드의 가독성 up
*/
var log = console.log;

add(2, 5); // 인수

function add(x, y) { // 함수명 , 매개변수 (파라메타)
    console.log('x + y = ' + (x + y)); // 함수 몸체 ( 비즈니스 로직 공간 )
    console.log(x + y);
    return x + y; // 반환값
}


// 해당하는 함수는 무슨 함수 일까요?
testFunction('214546457347');


function testFunction(pw) {

    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
        log("8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
    } else if (pw.search(/\s/) != -1) {
        log("비밀번호는 공백 없이 입력해주세요.");
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
        log("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
    } else {
        log("통과");
        return true;
    }
}


/*
    해당 기능은 패스워드의 유효성을 검사하는 로직으로
    다음과 같이 함수명으로 어떠한 기능을 하는지 유추가 가능
    function passwordCheck(pw){ // PasswordValidation, PwValidation
*/


/*
    12.3 함수 리터럴

    1. 아래의 함수 예제는 리터럴을 변수에 할당하고 있다. ( 리터럴이란 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기 방식 )
    2. 함수는 리터럴도 평가되어 값을 생성하며 이 값은 객체이다. ( 즉 함수는 객체이다. )
    3. 함수는 객체지만 일반 객체와는 다른점이 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다. 그리고 일반 객체에 없는 함수 객체만의 고유한 프로퍼티를 갖는다.

*/

var f = function add(x, y) {
    return x + y;
}

/*
    함수 정의 방식
*/

// 함수 선언문
// 함수 선언문은 표현식이 아닌 문이다.
function add(x, y) {
    return x + y;
}

// 함수 표현식
var add = function (x, y) {
    return x + y;
}

// Function 생성자 함수
var add = new Function(
    'x', 'y', 'return x+y'
);

//화살표 함수(ES6)
var add = (x, y) => x + y;

/*
함수 선언식과 함수 표현식의 차이
주요 차이점은, 호이스팅에서 차이가 발생

함수 선언식은 함수 전체를 호이스팅 합니다. 정의된 범위의 맨 위로 호이스팅되서 함수 선언 전에 함수를 사용할 수 있음

함수 표현식은 별도의 변수에 할당하게 되는데, 변수는 선언부와 할당부를 나누어 호이스팅 하게 됩니다. 선언부만 호이스팅
*/
log('sum = ' + sum(50, 50));
/*log('minus : ' + minus(100, 50));
minus(100, 50) // Uncaught TypeError: minus is not a function*/


function sum(a, b) { // 함수 선언식

    return a + b;
}

var minus = function (a, b) { // 함수 표현식

    return a - b;
}

minus(150, 50); // 100
