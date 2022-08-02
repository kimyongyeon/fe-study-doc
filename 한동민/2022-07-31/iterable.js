/*
*  이터러블이란 문법
*
* ES6에 도입
* 스프레드 문법은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다.
* 대상 : Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection),arguments와 같이 for... of 문으로 순회할 수 있는 이터러블에 한정
*
* 이터러블이란?
* ES6에서 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙
*
* 이터러블 프로토콜 : Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나
*                  프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
*
* 이터레이터 프로토콜 : 이터러블의 Symbol.iterater 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환
*                    이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 result 객체를 반환
                     이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다.




*
*/

var l = v => console.log(v);

// 이터러블 확인
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

console.log(''[Symbol.iterator]);
isIterable([]);
console.log('Array result = ' + isIterable([]));
isIterable('');
console.log('String result = ' + isIterable(''));
isIterable(new Map());
console.log('Map result = ' + isIterable(new Map()));
isIterable(new Set());
console.log('Set result = ' + isIterable(new Set()));
isIterable({});
console.log('Object result = ' + isIterable({}));

// 이터러블 내부 로직 (순회 가능한 객체 iterableObj)
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
        }
    };
}

// 해당 방식으로 이터러블 객체가 만들어짐
const iterableObj = {
    [Symbol.iterator]() {
        return makeIterator([1, 2, 3]);
    }
};

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
const iterableObj2 = [1, 2, 3];

// 이터러블은 for... of문으로 순회가 가능하다. 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
for (const item of iterableObj) {
    l(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
l([...iterableObj]);

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = iterableObj;
l(a, rest);

const obj = {a: 1, b: 2};

// 일반 객체는 iterater 메서드를 구현 또는 상속받지 않음
//일반 객체는 이터러블 프로토콜을 준수한 이러터블이 아니다.
l('일반 객체는 이터러블인가?')
l(Symbol.iterator in obj);

// 이터러블이 아닌 일반 객체는 for...of 문으로 순회 불가능
// for(const item of obj){ // TypeError: obj is not iterable
//     l(item);
// }

// const [c,d] = obj; // TypeError: obj is not iterable

// 1.2 이터레이터
// 이터러블의 Symbol.iterater 메서드를 호출하면 이터레이터를 반환하고 반환한 이터레이터는 next 메서드를 갖는다!

const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();
l('next를 갖는가?')
l('next' in iterator);

//next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 반환, 순회 결과를 나타내는 이터레이터 result 갹체는 다음과 같다.
// iterater result 객체는 value와 done 프로퍼티를 갖는 객체이다.
// value는 현재 순회 중인 이터러블 값을 나타내며 done는 순회 완료 여부를 나타냄
l(iterator.next());
l(iterator.next());
l(iterator.next());
l(iterator.next());

/*
 즉 for ... of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당하며 아래와 같다
 for(변수선언문 of 이터러블) {...}

 for...of 문은 for...in문의 형식과 매우 유사하다.
 for(변수 선언문 in 객체) {...}

 for...in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트[[Enumerable]]의 값이 ture인 프로퍼티를 순회하며 열거한다.
 이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

 */

// for...of 문의 내부 동작

// iterable
const rable = [1,2,3];

//이터러블의 Symbol.iterable 메서드를 호출하여 이터레이터 생성.
const rator = rable[Symbol.iterator]();

for(;;){
    // 이터레이터의 next 메서드를 호출하여 이터러블 순회
    // 이때 next 메서드는 이터레이터 result 객체 반환
    const res = rator.next();

    // next 메서드가 반환한 iterater result 객체의 done 프로퍼티 값이 ture면 이터러블 순회 종료
    if (res.done){
        l('done이 true이므로 종료 : ' + res.done);
        break;
    }

    //next 메서드가 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
    const item = res.value;
    l(item);
 var a = [1,2,3]


    /*
    * 이터레이션 프로토콜의 필요성
    *
    * ES6 이전의 순회 가능한 데이터 컬렉션을 통일된 규약 없이 각자 나름의 구조를 가지고 for , for... in, forEach 메서드 등 다양한 방법으로
    * 순회가 가능하였지만 ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여
    * for...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화 하였다.
    * 즉 데이터 공급자가 하나의 순회 방식을 갖도록 규정하여 데이터 소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록
    *  데이터 소비자와 데이터 공급자를 연결하는 인터페이스 역할을 하는 것과 같다.
    */

}
