//동기식 처리와 비동기식 처리

// --동기식과 비동기식의 의미
// 동기식은 직렬적, 즉 순차적으로 실행되는 처리모델이며 한 Task가 처리중일 때는 다른 Task는 대기 중에 있다.
// 비동기식은 반대로 병렬적으로 처리하며 Task가 종료되지 않아도 다른 Task를 처리할 수 있다. 

//동기식 처리의 예 
function func1(){
    console.log("첫 번째 작업");
    func2();
}

function func2(){
    console.log("두 번째 작업");
    func3();
}

function func3(){
    console.log("세 번째 작업");
}

//func1() 함수 호출 시 func1() -> func2() -> func3() 순차적으로 실행된다.

//비동기식 처리의 예
function func1() {
    console.log('첫 번째 작업');
    func2();
  }
  
  function func2() {
    setTimeout(function() {
      console.log('두 번째 작업');
    }, 0);
  
    func3();
  }
  
  function func3() {
    console.log('세 번째 작업');
  }

//func1() 함수 호출 시 func1() -> func3() -> func2() 실행된다.


//비동기식의 사례 

//1. ajax
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function(response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined

//https://domain.com에서 받아온 1번 상품의 내용을 가져와서 console.log로 출력하는 코드이다.
//1번 상품이 출력될 것 같지만 undefined가 출력된다. 왜일까.
//그 이유는 ajax가 비동기식으로 처리되기 때문이다.
// 서버에서 데이터가 오는 것을 기다려주지 않고 console.log를 실행했기 때문에 전달 된 데이터가 없는 것이다. 

//2. setTimeout
console.log('Hello');
setTimeout(function() {
	console.log('Bye');
}, 3000);
console.log('Hello Again');

//해당 코드도 마찬가지이다. 
// Hello -> Hello Again -> Bye 가 순서대로 출력된다. 
//그 이유는 setTimeout 함수가 비동기식 처리를 하기 떄문이다. 그래서 3초를 기다리는 동안 다음 함수가 처리되는 방식이다. 


//비동기식의 문제점은 콜백함수를 통해 해결할 수 있다. 
// 1번 사례의 문제점을 해결하는 방법 


//콜백 지옥

//콜백 지옥을 해결할 수 있는 방법

