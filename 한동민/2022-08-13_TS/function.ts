// 함수의 파라미터에 타입을 정의하는 방식 (함수의 파라미터(매개변수) 타입)
// function sum(a: number, b: number) { // 해당 함수는 리턴 값의 타입이 정해져 있지 않음 (타입을 정하지 않을 때는 void라도 사용)
//     return a + b;
// }
//
// console.log(sum(20,30));

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number{
    return 10;
}

// const result: String = add();

function sum(a: number, b: number): number {
    return a + b;
}

// const sumResult: String = sum(15,20);
// console.log(sumResult);

// 함수의 반환 타입
function sum3(a: number, b: number): number {
    return a + b;
}
sum3(10, 20); // 30
// sum3(10, 20, 30); // error, too many parameters
// sum3(10); // error, too few parameters