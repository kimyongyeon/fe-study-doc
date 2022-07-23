# 개요


Promise 가 resolve 상태가 되면 프라미스 핸들러 `.then` 이 실행된다고 했다. 

그러면 아래 코드는 어떻게 실행이 될까?
```javascript
let promise = Promise.resolve();
promise.then(() => alert("프라미스 성공!"));
alert("코드 종료");
```

코드종료 알람창이 먼저, 그 다음에 프라미스성공 알람창이 뜬다. 프라미스는 바로 이행(resolve) 상태가 되었는데 왜 그런걸까?

# 마이크로태스크 큐
지난번 프로미스로 마이크로태스크를 만들 수 있고, 자바스크립트 엔진은 매크로태스크를 하나 처리할 때마다 마이크로태스크 큐에 쌓인 마이크로태스크를 전부 처리한다고 했다.

마이크로태스크 큐의 특징을 다시 정리해보면,
* 마이크로태스크 큐는 FIFO 이다.
* 콜스택에 실행할 것이 아무것도 남아있지 않을 때만, 마이크로태스크 큐에 있는 작업이 실행된다.

간단히 말해서, 어떤 프라미스가 resolve되거나 reject될 때 이 프라미스의 핸들러 `.then/catch/finally` 가 큐에 들어간다고 생각하면 된다. (큐에 들어갈 뿐 실행되지는 않고) 현재 코드에서 자유로운 상태가 되었을 때서야 큐에서 작업을 꺼내서 실행한다.

```javascript
promise.then(handler); // 핸들러가 큐에 저장됨 (enqueue)
// ... 중략
alert("코드 종료");
// 스크립트 실행이 모두 끝나고
// 큐에 저장된 핸들러가 실행됨
```


# 참고 자료
- [JAVASCRIPT.INFO : 마이크로태스크](https://ko.javascript.info/microtask-queue)
- [Jake Archibald: 루프 속 - JSConf.Asia](https://youtu.be/cCOL7MC4Pl0)