# 35. Spread Syntax(스프레드 문법)

- ES6에서 도입
- 하나로 뭉쳐있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만듬
- 스프레드 문법의 사용 대산은 Array, String, Map, Set. DOM 컬렉션 등 for…of 문으로 순회 가능한 이터러블에 한정

```jsx
/* ...[1,2,3]은 [1,2,3]을 개별 요소로 분리한다.(-> 1, 2, 3) */
    console.log(...[1, 2, 3]);

    /* 문자열은 이터러블이다. */
    console.log(...'Hello');

    /* Map과 Set은 이터러블이다. */
    console.log(...new Map([['a','1'],['b','2']]));
    console.log(...new Set([1, 2, 3]));

    /* 이터러블이 아닌 일반 객체는 스프레드 문법의 대산이 될 수 없다. */
    console.log(...{ a: 1, b: 2}); // TypeError: Found non-callable @@iterator
```

- …[1, 2, 3]은 이터러블인 배열을 펼쳐 요소들을 개별적인 값들의 목록 1, 2, 3으로 만든다. 
이때 1 2 3 은 값이 아닌 값들의 목록이다. 
→ **즉 스프레드 문법의 결과는 값이 아니다. 이는 스프레드 문법 …이 피연산자를 연산하여 값을 생성하는 연산자가 아님을 의미한다. 즉 스프레드 문법의 결과는 변수에 할당할 수 없다.**

```jsx
/* 스프레드 문법의 결과는 값이 아니다.  */
const list = ...[1, 2, 3]; // SyntaxError: Unexpected token '...'
```

- 스프레드 문법의 결과물은 값으로 사용할 수 없다.
- 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용할 수 있다.
(함수 호출문의 인수 목록, 배열 리터럴의 요소 목록, 객체 리터럴의 프로퍼티 목록)

## 1. 함수 호출문의 인수 목록에서 사용하는 경우

- 요소들의 집합인 배열을 펼쳐서 개별적인 값들의 목록으로 만든 후, 이를 함수의 인수 목록으로 전달해야 하는 경우가 있다. (다음 예제를 살펴보자)

```jsx
const arr = [1, 2, 3];

    /* 배열 arr의 요소 중에서 최대값을 구하기 위해 Math.max를 사용했다. */
    const max = Math.max(arr); // NaN
```

- Math.max 메서드는 매개변수 개수를 확정할 수 없는 가변 인자 함수다. 다음과 같이 개수가 정해져 있지 않은 여러 개의 숫자를 인수로 전달받아 인수 중에서 최대값을 반환한다.

```jsx
/* Math.max 메서드에 숫자가 아닌 배열을 인수로 전달하면 최대값을 구할 수 없으므로 NaN을 반환 */
    console.log(Math.max([1, 2, 3]));
```

- 해당 문제 해결하려면 ( 배열 펼침 → 개별적인 값의 목록으로 만듬 → Math.max 메서드의 인수 전달) 즉 [1,2,3]을 펼쳐 1,2,3을 인수로 전달해야 함.
- 이전에는 Function/prototype.apply를 사용했음

```jsx
var arr = [1,2,3];
    /*  apply 함수의 2번째 인수(배열)는 apply 함수가 호출하는 함수의 인수 목록이다.
        따라서 배열이 펼쳐져서 인수로 전달되는 효과가 있다. */
    var max = Math.max.apply(null,arr);
    console.log(max);

    /*
    * 스프레드 문법을 사용하여 배열 arr을 1, 2, 3으로 펼쳐서 Math.max에 전달한다.
    * Math.max(...[1,2,3])은 Math.max(1, 2, 3)과 같다.
    */
    const max1 = Math.max(...arr);
```

## 2. 배열 리터럴 내부에서 사용하는 경우

- 스프레드 문법을 배열 리터럴에서 사용하면 더욱 간결하고 가독성 좋게 표현할 수 있음

### 2.1 concat

- ES5에서 2개의 배열을 1개의 배열로 결합하고 싶은 경우 concat을 사용해야 함

```jsx
/* ES5 */
    var arr = [1,2].concat([3,4]);
    console.log('ES5 : ' +arr);

    /* ES6 */
    arr = [...[1,2],...[3,4]];
    console.log('ES6 : ' + arr);
```

### 2.2 splice

- ES5에서 어떤 배열의 중간에 다른 배열의 요소를 추가 및 제거하려면 splice 메서를 사용해야 함
- splice 메서드의 세 번째 인수로 배열을 전달하면 배열 자체가 추가된다.

```jsx
/* ES5 */
    var arr1 = [1, 4];
    var arr2 = [2, 3];

    /*
    * 세 번째 인수 arr2를 해체하여 전달해야 한다.
    * 그렇지 않으면 arr1에 arr2 배열 자체가 추가된다.
    */
    arr1.splice(1,0,arr2)

    /* 기대하는 결과 = [1,2,3,4] */
    console.log(arr1);
```

- 위 예제에서 splice 메서드의 세 번째 인수 [2,3]을 2,3으로 해체 전달해야 원하는 결과 값이 나옴.

```jsx
/* ES5 */
    var arr1 = [1, 4];
    var arr2 = [2, 3];

    /*
    * apply 메서드의 2번째 인수(배열)는 apply 메서드가 호출한 splice 메서드의 인수 목록이다.
    * apply 메서드의 2번째 인수 [1, 0].cancat(arr2)는 [1, 0, 2, 3]으로 평가 된다.
    * 따라서 splice메서드에 apply 메서드의 2번째 인수 [1, 0, 2, 3]이 해체되어 전달된다.
    * arr1[1]부터 0개의 요소를 제거하고 그 자리(arr1[1])에 새로운 요소 (2, 3)을 삽입한다.
    */
    Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
    console.log(arr1);
```

- 스프레드 문법을 사용하면 다음과 같이 가독성 좋게 표현 가능

```jsx
/* ES6 */
var arr1 = [1, 4];
var arr2 = [2, 3];

arr1.splice(1,0 , ...arr2);
console.log(arr1);
```

### 2.3 배열 복사

- ES5에서 배열 복사 방법

```jsx
/* ES5 */
    var es5Origin = [1, 2];
    var rs5Copy = es5Origin.slice();

    console.log(rs5Copy);
    console.log(rs5Copy === es5Origin); // false

    /* ES5 */
    var es6Origin = [1, 2];
    var rs6Copy = [...es6Origin];

    console.log(rs6Copy);
    console.log(rs6Copy === es6Origin);

    /* 이때 원본 배열의 각 요소를 얕은 복사하여 새로운 복사본을 생성한다. 이는 slice도 마찬가지이다. */
```

### 2.3 이터러블을 배열로 복사

- ES5에서 이터러블 배열로 변환

```jsx
/* ES5 */
   function sum(){
       /* 이터러블이면서 유사 배열 객체인 arguments를 배열로 반환 */
       var args = Array.prototype.slice.call(arguments);

       return args.reduce(function (pre, cur){
           return pre + cur;
       }, 0);
   }

    console.log(sum(1,2,3));

   /* 이터러블이 아닌 유사 배열 객체 */
    const arrayLike = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };

    const arr = Array.prototype.slice.call(arrayLike); // [1,2,3]
    console.log(Array.isArray(arr));

    /* 스프레트 문법을 사용 */
    function es6Sum(){
        /* 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환 */
        return [...arguments].reduce((pre,cur) => pre + cur, 0);
    }

    console.log(es6Sum(1,2,3));
```

## 2. 객체 리터럴 내부에서 사용하는 경우

- 스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티 제안은 일반 객체 대상으로도 스프레드 문법의 사용을 허용한다.

```jsx
/* 스프레드 프로퍼티 */
/* 객체 복사(얕은 복사) */
const obj = { x:1 , y:2}
const copy = { ...obj };
console.log(copy); // { x:1 , y:2}
console.log(obj === copy); // false

/* 객체 병합 */
const merged = { x:1 , y:2, ...{ a: 3, b: 4} };
console.log(merged);

/* 객체 병합, 프로퍼티가 중복되는 경우 뒤에 위치한 프로퍼티가 우선권을 갖는다. */
const merged1 = Object.assign({},{ x:1 , y:2}, { y: 10, z: 3} );
console.log(merged1);

/* 특정 프로퍼티 변경 */
const changed = Object.assign({},{ x:1 , y:2}, { y: 100} );
console.log(merged1);

/* 특정 프로퍼티 변경 */
const added = Object.assign({},{ x:1 , y:2}, { z: 0} );
console.log(added);
```