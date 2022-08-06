/*
javascript EC6 객체지향 프로그램

1. let / const
2. object
3. this
4. arrow funcs
5. destructuring
6. spread
7. classes
8. modules

문제해결 : 프로그램 처럼 생각하는 방법
생성자 함수 개체 프로토타입 상속 다향성 클래스... 
*/

function sayHello() {
	for (var i = 0; i < 5; i++ ) {
		console.log("i: " + i);
	}
	console.log("i: " + i ); // --5
}

sayHello();

// var -> function
// let -> block
// const -> block

function sayHello2() {
	for (let j = 0; j < 5; j++ ) {
		console.log("j: "+ j);
	}
	console.log("j: "+ j); // --5
}

sayHello2();

