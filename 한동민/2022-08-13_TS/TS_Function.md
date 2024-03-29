# 함수

## **타입스크립트에서의 함수**

웹 애플리케이션을 구현할 때 자주 사용되는 함수는 타입스크립트로 크게 다음 3가지 타입을 정의할 수 있습니다.

- 함수의 파라미터(매개변수) 타입
- 함수의 반환 타입
- 함수의 구조 타입

## **[#](https://joshua1988.github.io/ts/guide/functions.html#%ED%95%A8%EC%88%98%EC%9D%98-%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8)함수의 기본적인 타입 선언**

타입스크립트의 함수 선언 방법을 이해하기 위해 먼저 간단한 자바스크립트 함수를 보겠습니다.

```jsx
function sum(a, b) {
  return a + b;
}
```

위 자바스크립트 함수에 타입을 부여하면 아래와 같습니다.

```jsx
function sum(a: number, b: number): number {
  return a + b;
}
```

기존 자바스크립트 함수의 선언 방식에서 **매개변수**와 함수의 **반환 값**에 타입을 추가하였습니다.

**TIP**

함수의 반환 값에 타입을 정하지 않을 때는 `void`라도 사용

## **[#](https://joshua1988.github.io/ts/guide/functions.html#%ED%95%A8%EC%88%98%EC%9D%98-%EC%9D%B8%EC%9E%90)함수의 인자**

타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주합니다. 따라서, 함수의 매개변수를 설정하면 `undefined`나 `null`이라도 인자로 넘겨야하며 컴파일러에서 정의된 매개변수 값이 넘어 왔는지 확인합니다. 달리 말하면 정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다는 의미입니다.

```jsx
function sum(a: number, b: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // error, too few parameters
```

위와 같은 특성은 정의된 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 자바스크립트의 특성과 반대됩니다. 만약 이러한 특성을 살리고 싶다면 `?`를 이용해서 아래와 같이 정의할 수 있습니다.

```
function sum(a: number, b?: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // 타입 에러 없음

```

매개변수 초기화는 ES6 문법과 동일합니다.

```jsx
function sum(a: number, b = '100'): number {
  return a + b;
}
sum(10, undefined); // 110
sum(10, 20, 30); // error, too many parameters
sum(10); // 110
```

## **[#](https://joshua1988.github.io/ts/guide/functions.html#rest-%EB%AC%B8%EB%B2%95%EC%9D%B4-%EC%A0%81%EC%9A%A9%EB%90%9C-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98)REST 문법이 적용된 매개변수**

ES6 문법에서 지원하는 **[Rest 문법](https://babeljs.io/docs/en/learn#default-rest-spread)**은 타입스크립트에서 다음과 같이 사용할 수 있습니다.

- Rest문법
    
    [https://learnjs.vlpt.us/useful/07-spread-and-rest.html](https://learnjs.vlpt.us/useful/07-spread-and-rest.html)
    

```jsx
function sum(a: number, ...nums: number[]): number {
  const totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return a + totalOfNums;
}
```

## **[#](https://joshua1988.github.io/ts/guide/functions.html#this)this**

타입스크립트에서 자바스크립트의 `this`가 잘못 사용되었을 때 감지할 수 있습니다. 만약 `this`가 뭔지 모른다면 일단 다음 글을 먼저 확인하고 읽어주세요.

**[Understanding Javascript Function Invocation and this](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)**

타입스크립트에서 `this`가 가리키는 것을 명시하려면 아래와 같은 문법을 사용합니다.

```jsx
function 함수명(this: 타입) {
  // ...
}
```

그럼 위 문법을 실제 예제에 적용해보겠습니다.

```jsx
interface Vue {
  el: string;
  count: number;
  init(this: Vue): () => {};
}

let vm: Vue = {
  el: '#app',
  count: 10,
  init: function(this: Vue) {
    return () => {
      return this.count;
    }
  }
}

let getCount = vm.init();
let count = getCount();
console.log(count); // 10
```

위의 코드를 타입스크립트로 컴파일 했을 때 만일 `--noImplicitThis` 옵션이 있더라도 에러가 발생하지 않습니다.

## **[#](https://joshua1988.github.io/ts/guide/functions.html#%EC%BD%9C%EB%B0%B1%EC%97%90%EC%84%9C%EC%9D%98-this)콜백에서의 this**

앞에서 살펴본 일반적인 상황에서의 `this`와는 다르게 콜백으로 함수가 전달되었을 때의 `this`를 구분해줘야 할 때가 있습니다. 그럴땐 아래와 같이 강제할 수 있습니다.

```jsx
interface UIElement {
  // 아래 함수의 `this: void` 코드는 함수에 `this` 타입을 선언할 필요가 없다는 의미입니다.
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClick(this: Handler, e: Event) {
        // 위의 `UIElement` 인터페이스의 스펙에 `this`가 필요없다고 했지만 사용했기 때문에 에러가 발생합니다.
        this.info = e.message;
    }
}
let handler = new Handler();
uiElement.addClickListener(handler.onClick); // error!
```

만약 `UIElement` 인터페이스의 스펙에 맞춰 `Handler`를 구현하려면 아래와 같이 변경합니다.

```
class Handler {
    info: string;
    onClick(this: void, e: Event) {
        // `this`의 타입이 void이기 때문에 여기서 `this`를 사용할 수 없습니다.
        console.log('clicked!');
    }
}
let handler = new Handler();
uiElement.addClickListener(handler.onClick);
```

> **TIP**
> 

> 클래스의 메서드 방식으로 선언하는 것과 변수에 화살표 함수를 연결하는 것의 차이점!
> 

> One arrow function is created per object of type Handler. Methods, on the other hand, are only created once and attached to Handler’s prototype. They are shared between all objects of type Handler
> 

- 출처
    
    [https://joshua1988.github.io/ts/guide/functions.html#this](https://joshua1988.github.io/ts/guide/functions.html#this)