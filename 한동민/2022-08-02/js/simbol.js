const log = (str) => console.log(str);

/* EX1 */
log('=====[Ex1]=====');
// Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.
const mySmbol = Symbol();
log('typeof :: ' + typeof mySmbol);

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
log('mySmbol 심벌 값 테스트');
log(mySmbol);

/* EX2 */
log('=====[Ex2]=====');
// TypeError: Symbol is not a constructor
// new Symbol();

/* EX3 */
log('=====[Ex3]=====');
// 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
const mySymbol1 = Symbol('mySimbol');
const mySymbol2 = Symbol('mySimbol');

log('[mySymbol1 === mySymbol2] :: ' + (mySymbol1 === mySymbol2)); // false

/* EX4 */
log('=====[Ex4]=====');
const mySymbolEx4 = Symbol('mySymbolEx4');

// 심벌도 래퍼 객체를 생성한다.
log('[mySymbolEx4.description] :: ' + mySymbolEx4.description); // mySimbolEx4
log('[mySymbolEx4.toString] :: ' +mySymbolEx4.toString()); // Simbol(mySymbolEx4)

// 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
// log(mySymbolEx4 + ''); //  Cannot convert a Symbol value to a string
// log(+mySymbolEx4); // Cannot convert a Symbol value to a number

/* EX5 */
log('=====[Ex5]=====');
log('[!!mySmbol] :: ' + !!mySmbol); // true

// if문 등에서 존재 확인이 가능하다.
if(mySmbol){
    log('mySymbol is not empty.');
}

/* EX6 */
log('=====[Ex6]=====');

// 전역 심벌 레지스트리에 mySimbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySimbol');
// 전역 심벌 레지스트리에 mySimbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for('mySimbol');

log( '[(s1 === s2)] :: ' + (s1 === s2)); // true

/* EX7 */
log('=====[Ex7]=====');
// 전역 심벌 레지스트리에 mySimbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const n1 = Symbol.for('mySimbolN1');
// 전역 심벌 레지스토리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(n1); // -> mySymbol
log(Symbol.keyFor(n1));

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const n2 = Symbol('foo');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(n2); // -> undefined
log(Symbol.keyFor(n2));

/* EX 8 */
log('=====[Ex8]=====');
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수 정의
// 값 1,2,3,4 에는 특별한 의미가 없고 상수 이름에 의미가 있다.
const Direction ={
    up : 1,
    down : 2,
    left : 3,
    right : 4
}

// 변수에 상수를 항당
const myDirection = Direction.up;

if(myDirection === Direction.up){
    log('Direction UP');
}

log('=====[Ex9]=====');
/* EX 09 */
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수 정의
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성
const Direction1 ={
    up : Symbol('up'),
    down : Symbol('down'),
    left : Symbol('left'),
    right : Symbol('right')
}

// 변수에 상수를 항당
const myDirection1 = Direction1.up;

if(myDirection1 === Direction1.up){
    log('Direction1 go UP');
}


/* EX 10 */
log('=====[Ex10]=====');
const obj3 = {
    // 심벌 값으로 프로퍼티 키를 생성
    [Symbol.for('mySymbol')]: 1
};
obj3[Symbol.for('mySymbol')]; //1
log(obj3[Symbol.for('mySymbol')]);

/* EX 11 */
log('=====[Ex11]=====');

const obj4 = {
    [Symbol('mysymbol4')]: 1
};

for(const key in obj4){
    log('[const key in] mysymbol4 의 Symbol키 값이 나오는가? = ' + key);
}

log('[keys] mysymbol4 의 Symbol키 값이 나오는가? = ' + Object.keys(obj4));
log('[getOwnPropertyDescriptor] mysymbol4 의 Symbol키 값이 나오는가? = ' + Object.getOwnPropertyDescriptor(obj4));

/* EX 12 */
log('=====[Ex12]=====');

// 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환한다.
log('[getOwnPropertySymbols] mysymbol4 의 Symbol키 값이 나오는가?');
log(Object.getOwnPropertySymbols(obj4));

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
const symbolKey1 = Object.getOwnPropertySymbols(obj4)[0];
log('[symbolKey1] mysymbol4 의 Symbol키[0]');
log(Object.getOwnPropertySymbols(obj4));

/* EX 13 */
log('=====[Ex13]=====');
// Array 표준 빌트인 객체에 메서드를 추가하여 확장하는 것 => 권장 X
Array.prototype.sum = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
};
[1, 2].sum(); // 3

// 심벌 값으로 프로퍼티 키를 갖는 메서드로 확장하는 경우 => 호환성 측면에서 O
Array.prototype[Symbol.for('sum')] = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
};
[1, 2][Symbol.for('sum')](); // 3

/* EX 14 */
log('=====[Ex14]=====');
const iterable = {
    // Symbol.itertor 메서드를 구현하여 이터러블 프로토콜을 준수
    [Symbol.iterator]() {
        let cur = 1;
        const max = 5;

        // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
        return {
            next() {
                return { value: cur++, done: cur > max + 1 };
            },
        };
    },
};

for (const num of iterable) {
    console.log(num); // 1 2 3 4 5
}