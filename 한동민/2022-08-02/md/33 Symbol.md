# 33. Symbol

## 1. 심벌이란?

- 1997년 자바스크립트가 ECMAScript로 표준화된 이래로 6개의 타입 (**문자열**, **숫자**, **불리언**, **undefined**, **null**, **객체**) 타입이 존재
- Simbol은 **ES6**에서 도입된 7번째 데이터 타입으로 변경 불가능한 **원시 타입**의 값이다.
- Simbol 값은 다른 값과 중복되지 않는 유일무이한 값이다. 
→ 즉 충돌 위험이 없는 **유일한 프로퍼티 키**를 만들기 위해 사용한다.\
- 프로퍼티 키로 사용할 수 있는 값은 빈 문자열을 포함하는 모든 문자열 또는 심벌 값이다.

## 2. 심벌 값의 생성

### 2.1 Symbol 함수

Ex 01)

- Symbol 함수를 호출하여 생성
- 다른 원시값 (**문자열**, **숫자**, **불리언**, **undefined**, **null)** 의 타입의 값은 [리터럴 표기법](https://velog.io/@pjeeyoung/%EB%A6%AC%ED%84%B0%EB%9F%B4)을 통해 값을 생성할 수 있으나 Symbol값은 함수를 호출하여 생성해야 함.
- Symbol 값은 외부 노출이 되지 않아 확인 할 수 없고, **다른 값과 절대 중복되지 않는 유일무이한값**

```jsx
// Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.
const mySmbol = Symbol();
log('typeof :: ' + typeof mySmbol);

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
log('mySmbol 심벌 값 테스트');
log(mySmbol);
```

Ex 02)

- 생성자 함수로 객체를 생성하는 것처럼 보이지만 Symbol 함수는 String, Number, Boolean 생성자 함수와는 달리 **new 연산자와 함께 호출하지 않는다**.
- new 연산자와 함께 생성자 함수 또는 클래스를 호출하면 객체(인스턴스)가 생성되지만 심벌 값은 변경 불가능한 원시 값이다.

```jsx
new Symbol(); // TypeError: Symbol is not a constructor
```

Ex 03)

- Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다.
- 문자열은 생성된 심벌 값에 대한 설명으로 **디버깅 용도**로만 사용이 된다.
→ 심벌 값 생성에는 어떠한 **영향도 주지 않는다.** (**즉 설명이 같아도 생성 심벌 값은 다름**)

```jsx
// 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
const mySymbol1 = Symbol('mySimbol');
const mySymbol2 = Symbol('mySimbol');

log('[mySymbol1 === mySymbol2] :: ' + (mySymbol1 === mySymbol2)); // false
```

Ex 04)

- 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

```jsx
const mySymbolEx4 = Symbol('mySymbolEx4');

// 심벌도 래퍼 객체를 생성한다.
log('[mySymbolEx4.description] :: ' + mySymbolEx4.description); // mySimbolEx4
log('[mySymbolEx4.toString] :: ' +mySymbolEx4.toString()); // Simbol(mySymbolEx4)

// 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
log(mySymbolEx4 + ''); //  Cannot convert a Symbol value to a string
log(+mySymbolEx4); // Cannot convert a Symbol value to a number
```

Ex 05)

- 단 불리언 타입으로는 암묵적으로 타입 변환된다. 이를 통해 if문 등에서 존재 확인이 가능하다.

```jsx
log('=====[Ex4]=====');
log('[!!mySmbol] :: ' + !!mySmbol); // true

// if문 등에서 존재 확인이 가능하다.
if(mySmbol){
    log('mySymbol is not empty.');
}
```

### 2. Symbol.for / Symbol.keyFor 메서드

Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.

Ex 06)

- 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환
- 검색 실패하면 새로운 심벌 값을 생성하여 Symbol.for 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.

```jsx
// 전역 심벌 레지스트리에 mySimbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySimbol');
// 전역 심벌 레지스트리에 mySimbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for('mySimbol');

log( '[(s1 === s2)] :: ' + (s1 === s2)); // true
```

Ex07)

- Symbol 함수는 호출될 때마다 유일무이한 심벌 값 생성
- 자바스크립트 엔진이 관리하는 심벌 값 저장소인 전역 심벌 레지스트리에서 **심벌 값을 검색할 수 있는 키를 지정할 수 없으므로** 전역 심벌 레지스트리에 등록되어 관리되지 않음
- **Symbol.for** 메서드를 사용하면 애플리케이션 전영서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.
- **Symbol.keyFor** 메서드를 사용하면 **전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.**

```jsx
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
```

### 3. 심벌과 상수

Ex08)

- 예를 들어, 4방향 즉 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다고 생각해보자

```jsx
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
    log('go UP');
}
```

위 예제와 같이 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있다.

이때 문제는 상수 값 1, 2, 3, 4가 변경 될 수 있으며 다른 변수 값과 중복될 수 있다는 것이다.

이러한 경우 변경/중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

Ex09)

```jsx
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
    log('go UP');
}
```

### 4. 심벌과 프로퍼티 키

- 객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 또는 심벌 값으로 만들 수 있으며, 동적으로 생성 할 수 있다.
- 심벌 값으로 프로퍼티 키를 동작 생성하여 프로퍼티를 만들땐 심벌 값에 대괄호를 사용해야 한다.
- 프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용해야 한다.
- 심벌 값은 유일무이한 값으므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.

```jsx
const obj = {
	// 심벌 값으로 프로퍼티 키를 생성
	[Symbol.for('mySymbol')]: 1
};

obj[Symbol.for('mySymbol')];
```

### 5. 심벌과 프로퍼티 키

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for … in문이나 Object.keys ,
    
    Object.getOwnPropertyNames 메서드로 찾을 수 없다.
    
- 심벌 값을 프로퍼티 키로 사용하여 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

```jsx
const obj4 = {
    [Symbol('mysymbol4')]: 1
};

for(const key in obj4){
    log('[const key in] mysymbol4 의 Symbol키 값이 나오는가? = ' + key);
}

log('[keys] mysymbol4 의 Symbol키 값이 나오는가? = ' + Object.keys(obj4));
log('[getOwnPropertyDescriptor] mysymbol4 의 Symbol키 값이 나오는가? = ' + Object.getOwnPropertyDescriptor(obj4));
```

- 단 ES6 Object.getOwnpropertySymbols 메서드를 사용하면 심벌 값을 프로퍼티 키로 사용하여 찾을 수 있다.

```jsx
// 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환한다.
log('[getOwnPropertySymbols] mysymbol4 의 Symbol키 값이 나오는가?');
log(Object.getOwnPropertySymbols(obj4));

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
const symbolKey1 = Object.getOwnPropertySymbols(obj4)[0];
log('[symbolKey1] mysymbol4 의 Symbol키[0]');
log(Object.getOwnPropertySymbols(obj4));
```

### 5. 심벌과 프로퍼티 키

- 일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않는다. 표준 빌트인 객체는 읽기 전용으로 사용하는 것이 좋다.

```jsx
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
```

### 5. Well-known Symbol

- 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 well-known Symbol 이라 부른다.
- for - of 문으로 순회 가능한 이터러블은 Well-known Symbol 인 Symbol.iterator를 키로 갖는 메서드를 가진다. (**Array**, **String**, **Map**, **Set**, **TypedArray**, **arguments**, **NodeList**, **HTMLColletion**)등
- Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있음
- 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다.

```jsx
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
```