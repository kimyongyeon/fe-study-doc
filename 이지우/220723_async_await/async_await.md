# 개요

`async`와 `await`를 사용하면 프라미스를 좀 더 편하게 사용할 수 있다.

# async

`async` 키워드는 function 앞에 작성한다.

`async` 함수는 두 가지 효과가 있다.

1. `async` 함수는 언제나 프라미스를 반환한다.
2. `async` 함수 안에서만 `await` 키워드를 사용할 수 있다.

함수 앞에 `async` 키워드를 붙이면 해당 함수는 항상 프라미스를 반환한다. 아래같이 프라미스가 아닌 값을 반환해도 이행상태의 프라미스로 값을 감싸서 이행된 프라미스가 반환되게 한다.

```javascript
async function f() {
  return 1;
}
```

즉, `Promise.resolve(1)` 를 명시적으로 반환하지 않고 `1` 을 `return`해도

```javascript
async function f() {
  return Promise.resolve(1);
}
```

이렇게 반환된다.

그럼 `async` 함수 안에서만 `await` 키워드를 사용할 수 있다는 것은 뭘까?

# await

`await` 키워드는 `async` 함수 안에서만 동작한다.

`await` 키워드를 쓰면 `.then/catch`가 거의 필요 없게 된다.

자바스크립트는 `await` 키워드를 만나면 프라미스가 처리될 때까지 기다린다.

```javascript
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

(\*)로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개된다. 처리된 프라미스 객체의 result 값이 변수 result에 할당된다.

```javascript
axios
  .get("/user?ID=12345")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

따라서 이 소스는

```javascript
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

이렇게 바뀔 수 있다.


# 참고 자료
- [JAVASCRIPT.INFO : async와 await](https://ko.javascript.info/async-await)