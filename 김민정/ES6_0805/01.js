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

