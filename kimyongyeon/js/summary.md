# 요약

1. js 엔진 + web api 연구
   - call stack
   - call stack queue
   - event loop 
2. 함수선언 + 함수표현식 우선순위
   - 변수 리터널 함수
   - 선언형 함수 
   - 유명함수
   - 익명함수
   - 즉시함수
   - 일급함수
   - 고계함수
   - arrow 함수
   - 콜백함수 
3. 선언 + 초기화 + 실행
4. TDZ
5. let, const, var
6. hoisting
7. scope : lexical, functional, block
8. 비동기 함수 : xhr, setTimeout, setInterval, fetch
9. promise
   - resolve
   - reject 
10. async, await
11. this binding
12. event 위임 : 버블링, 캡처링
    - event.target
    - event.target.dataset.[id, action]
13. 객체 클래스
    - #변수, public, constructor(생성자), set, get
14. generation
    - yield 
    - function *test() {}
15. symbol
    - iterator
16. 클로저
17. prototype, proto
    ```typescript
    const member = new Member();
    Member.prototype.name = "";
    member.__proto__.name = "proto";
    ```
18. rest, spread
19. 구조분해할당 == 디스트럭처링
    ```typescript
    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(rest); // [30, 40, 50]
    ```
20. 템플릿 리터널
21. 템플릿 태그 함수